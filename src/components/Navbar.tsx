import { useEffect, useRef, useState } from 'react';
import { signInWithGoogle, signOut } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { useTx } from '../i18n/uiText';
import { Icon } from './Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PLATFORM_PATH, navigate } from '../lib/router';

interface NavbarProps {
  onHome: () => void;
  signedIn: boolean;
  userName?: string | null;
  avatarUrl?: string | null;
  isAdmin?: boolean;
  onAdmin?: () => void;
}

function NavAvatar({ url, name }: { url: string | null; name: string | null }) {
  const [failed, setFailed] = useState(false);
  if (url && !failed) {
    return (
      <img
        className="app-nav-avatar"
        src={url}
        alt={name ?? 'Profile'}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="app-nav-avatar app-nav-avatar-fallback">
      <Icon name="user" size={16} />
    </span>
  );
}

// The same navbar on the landing page and on every app screen.
export function Navbar({ onHome, signedIn, userName, avatarUrl, isAdmin, onAdmin }: NavbarProps) {
  const tx = useTx();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const clearCloseTimer = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMenu = () => {
    clearCloseTimer();
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  const handleSignOut = () => {
    setMenuOpen(false);
    void signOut().then(() => navigate('/', { replace: true }));
  };
  const handleAdmin = () => {
    setMenuOpen(false);
    onAdmin?.();
  };

  return (
    <nav className="app-navbar" aria-label="Main">
      <div className="app-navbar-container">
        <button type="button" className="app-navbar-logo" onClick={onHome}>
          <span className="app-navbar-logo-mark">
            <Icon name="bookOpen" size={20} />
          </span>
          <span className="app-navbar-logo-text">Learn Loughat</span>
        </button>

        <div className="app-navbar-actions">
          <LanguageSwitcher />
          {signedIn ? (
            <div
              className="app-nav-user-wrap"
              ref={menuRef}
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="app-nav-user app-nav-user-trigger"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label={userName ? `${userName} menu` : 'Account menu'}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <NavAvatar key={avatarUrl ?? 'none'} url={avatarUrl ?? null} name={userName ?? null} />
                {userName && <span className="app-nav-user-name">{userName}</span>}
                <svg className="app-nav-user-caret" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {menuOpen && (
                <div className="app-nav-dropdown" role="menu">
                  {isAdmin && onAdmin && (
                    <button type="button" className="app-nav-dropdown-item" role="menuitem" onClick={handleAdmin}>
                      <Icon name="shield" size={16} />
                      <span>{tx('home.admin')}</span>
                    </button>
                  )}
                  <button type="button" className="app-nav-dropdown-item danger" role="menuitem" onClick={handleSignOut}>
                    <Icon name="logout" size={16} />
                    <span>{tx('home.signOut')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="app-nav-btn primary"
              onClick={() => {
                if (supabase) {
                  void signInWithGoogle().catch(() => {});
                } else if (import.meta.env.DEV) {
                  navigate(PLATFORM_PATH);
                }
              }}
              aria-label={supabase ? tx('nav.connect') : (import.meta.env.DEV ? 'Enter platform' : tx('nav.connect'))}
              title={supabase ? tx('nav.connect') : (import.meta.env.DEV ? 'Open platform (offline dev)' : 'Sign-in not configured')}
            >
              <Icon name={supabase ? 'login' : 'arrowRight'} size={17} />
              <span className="app-nav-label">{supabase ? tx('nav.connect') : (import.meta.env.DEV ? 'Enter platform' : tx('nav.connect'))}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
