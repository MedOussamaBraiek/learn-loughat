import { signInWithGoogle, signOut } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { useTx } from '../i18n/uiText';
import { Icon } from './Icon';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onHome: () => void;
  signedIn: boolean;
  userName?: string | null;
  avatarUrl?: string | null;
  isAdmin?: boolean;
  onAdmin?: () => void;
}

// The same navbar on the landing page and on every app screen.
export function Navbar({ onHome, signedIn, userName, avatarUrl, isAdmin, onAdmin }: NavbarProps) {
  const tx = useTx();

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
          {isAdmin && onAdmin && (
            <button type="button" className="app-nav-btn admin" onClick={onAdmin}>
              <Icon name="shield" size={17} />
              <span className="app-nav-label">{tx('home.admin')}</span>
            </button>
          )}
          {supabase && (
            signedIn ? (
              <>
                <div className="app-nav-user" title={userName ?? undefined}>
                  {avatarUrl ? (
                    <img className="app-nav-avatar" src={avatarUrl} alt={userName ?? 'Profile'} referrerPolicy="no-referrer" />
                  ) : (
                    <span className="app-nav-avatar app-nav-avatar-fallback">
                      <Icon name="user" size={16} />
                    </span>
                  )}
                  {userName && <span className="app-nav-user-name">{userName}</span>}
                </div>
                <button type="button" className="app-nav-btn" onClick={() => { void signOut(); }}>
                  <Icon name="logout" size={17} />
                  <span className="app-nav-label">{tx('home.signOut')}</span>
                </button>
              </>
            ) : (
              <button type="button" className="app-nav-btn primary" onClick={() => { void signInWithGoogle(); }}>
                <Icon name="login" size={17} />
                <span className="app-nav-label">{tx('nav.connect')}</span>
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
