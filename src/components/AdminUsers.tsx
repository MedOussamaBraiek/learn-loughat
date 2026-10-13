import { useEffect, useMemo, useState } from 'react';
import { adminDeleteUser, adminListUsers, adminSetBlocked, type AdminUser } from '../lib/admin';
import { friendlyError } from '../lib/rankings';

interface AdminUsersProps {
  onBack: () => void;
}

type Filter = 'all' | 'active' | 'blocked';

const PAGE_SIZE = 20;

// Admin only: see every user, block / unblock, or delete. The database checks admin rights again.
export function AdminUsers({ onBack }: AdminUsersProps) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [busy, setBusy] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const load = () => {
    setLoading(true);
    setError(null);
    adminListUsers()
      .then(setUsers)
      .catch((e: unknown) => setError(friendlyError(e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const stats = useMemo(() => ({
    users: users.length,
    blocked: users.filter((u) => u.is_blocked).length,
    attempts: users.reduce((sum, u) => sum + u.attempts, 0),
  }), [users]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (filter === 'blocked' && !u.is_blocked) return false;
      if (filter === 'active' && u.is_blocked) return false;
      if (!q) return true;
      return u.user_email.toLowerCase().includes(q) || (u.user_nickname ?? '').toLowerCase().includes(q);
    });
  }, [users, query, filter]);

  const pageCount = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageUsers = shown.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  const toggleBlock = async (u: AdminUser) => {
    const next = !u.is_blocked;
    const question = next
      ? `Block ${u.user_email}? They can't play or appear in rankings until you unblock them.`
      : `Unblock ${u.user_email}?`;
    if (!window.confirm(question)) return;
    setBusy(u.user_id);
    try {
      await adminSetBlocked(u.user_id, next);
      setUsers((list) => list.map((x) => (x.user_id === u.user_id ? { ...x, is_blocked: next } : x)));
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(null);
    }
  };

  const remove = async (u: AdminUser) => {
    if (!window.confirm(`Delete ${u.user_email}? Their account and all scores are removed. This cannot be undone.`)) return;
    setBusy(u.user_id);
    try {
      await adminDeleteUser(u.user_id);
      setUsers((list) => list.filter((x) => x.user_id !== u.user_id));
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="course-screen admin-page">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">🛠️</span>
          <h2 className="course-title">Admin</h2>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><strong>{stats.users}</strong><span>Users</span></div>
        <div className="admin-stat"><strong>{stats.blocked}</strong><span>Blocked</span></div>
        <div className="admin-stat"><strong>{stats.attempts}</strong><span>Challenges played</span></div>
      </div>

      <input
        className="admin-search"
        type="search"
        placeholder="🔍 Search by email or name"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setPage(0); }}
      />

      <div className="gloss-toggle admin-filters" role="group" aria-label="Filter users">
        {(['all', 'active', 'blocked'] as Filter[]).map((f) => (
          <button key={f} className={`gloss-btn${filter === f ? ' active' : ''}`} aria-pressed={filter === f} onClick={() => { setFilter(f); setPage(0); }}>
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Blocked'}
          </button>
        ))}
      </div>

      {loading && <p className="match-hint">Loading users…</p>}
      {error && <p className="scene-message bad">{error}</p>}

      <div className="admin-list">
        {pageUsers.map((u) => (
          <article key={u.user_id} className={`admin-card${u.is_blocked ? ' blocked' : ''}`}>
            <div className="admin-avatar">{(u.user_nickname ?? u.user_email).charAt(0).toUpperCase()}</div>
            <div className="admin-main">
              <div className="admin-title-row">
                <strong className="admin-name">{u.user_nickname ?? 'No name'}</strong>
                <span className={`admin-status ${u.is_blocked ? 'blocked' : 'active'}`}>{u.is_blocked ? 'Blocked' : 'Active'}</span>
              </div>
              <span className="admin-email">{u.user_email}</span>
              <div className="admin-chips">
                <span>🎯 {u.attempts} played</span>
                <span>📅 last {u.last_played ?? 'never'}</span>
                <span>🗓️ joined {new Date(u.joined_at).toLocaleDateString()}</span>
              </div>
              <div className="admin-actions">
                <button
                  className={`admin-btn ${u.is_blocked ? 'unblock' : 'block'}`}
                  disabled={busy === u.user_id}
                  onClick={() => { void toggleBlock(u); }}
                >
                  {u.is_blocked ? '✅ Unblock' : '⛔ Block'}
                </button>
                <button
                  className="admin-btn delete"
                  disabled={busy === u.user_id}
                  onClick={() => { void remove(u); }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </article>
        ))}
        {!loading && !error && shown.length > PAGE_SIZE && (
          <div className="admin-pager">
            <button className="admin-btn" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>← Previous</button>
            <span>Page {currentPage + 1} of {pageCount}</span>
            <button className="admin-btn" disabled={currentPage >= pageCount - 1} onClick={() => setPage(currentPage + 1)}>Next →</button>
          </div>
        )}
        {!loading && !error && shown.length === 0 && (
          <p className="match-hint">No users match this search.</p>
        )}
      </div>
    </div>
  );
}
