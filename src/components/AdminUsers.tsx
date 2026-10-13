import { useEffect, useMemo, useState } from 'react';
import { adminDeleteUser, adminListUsers, adminSetBlocked, type AdminUser } from '../lib/admin';

interface AdminUsersProps {
  onBack: () => void;
}

// Admin only: every user, with block / unblock and delete. The database checks the admin rights again.
export function AdminUsers({ onBack }: AdminUsersProps) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    adminListUsers()
      .then(setUsers)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.user_email.toLowerCase().includes(q) || (u.user_nickname ?? '').toLowerCase().includes(q));
  }, [users, query]);

  const toggleBlock = async (u: AdminUser) => {
    const next = !u.is_blocked;
    const question = next ? `Block ${u.user_email}? They will not be able to play or appear in rankings.` : `Unblock ${u.user_email}?`;
    if (!window.confirm(question)) return;
    setBusy(u.user_id);
    try {
      await adminSetBlocked(u.user_id, next);
      setUsers((list) => list.map((x) => (x.user_id === u.user_id ? { ...x, is_blocked: next } : x)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (u: AdminUser) => {
    if (!window.confirm(`Delete ${u.user_email} permanently? Their account and all scores will be removed. This cannot be undone.`)) return;
    setBusy(u.user_id);
    try {
      await adminDeleteUser(u.user_id);
      setUsers((list) => list.filter((x) => x.user_id !== u.user_id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">🛠️</span>
          <h2 className="course-title">Admin · Users</h2>
        </div>
      </div>

      <p className="match-hint">{users.length} users</p>
      <input
        className="admin-search"
        type="search"
        placeholder="Search by email or nickname"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="match-hint">Loading…</p>}
      {error && <p className="scene-message bad">{error}</p>}

      <div className="admin-list">
        {filtered.map((u) => (
          <div key={u.user_id} className={`admin-row${u.is_blocked ? ' blocked' : ''}`}>
            <div className="admin-info">
              <strong>{u.user_nickname ?? '—'}</strong>
              <span className="admin-email">{u.user_email}</span>
              <span className="admin-meta">
                {u.attempts} attempts · last played {u.last_played ?? 'never'} · joined {new Date(u.joined_at).toLocaleDateString()}
              </span>
              {u.is_blocked && <span className="admin-badge">Blocked</span>}
            </div>
            <div className="admin-actions">
              <button className="action-btn secondary admin-btn" disabled={busy === u.user_id} onClick={() => { void toggleBlock(u); }}>
                {u.is_blocked ? 'Unblock' : 'Block'}
              </button>
              <button className="action-btn secondary admin-btn admin-delete" disabled={busy === u.user_id} onClick={() => { void remove(u); }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {!loading && !error && filtered.length === 0 && <p className="match-hint">No users found.</p>}
      </div>
    </div>
  );
}
