import { signOut } from '../lib/rankings';
import { Icon } from './Icon';

// Shown to a signed-in user whose account the admin has blocked
export function Blocked() {
  return (
    <div className="state-screen">
      <div className="state-card">
        <span className="state-icon danger">
          <Icon name="ban" size={34} />
        </span>
        <h1 className="state-title">Account blocked</h1>
        <p className="state-text">Your account has been blocked, so you can't access Learn Loughat right now.</p>
        <p className="state-sub">Please contact the administrator if you believe this is a mistake.</p>
        <button type="button" className="btn-primary" onClick={() => { void signOut(); }}>
          <Icon name="logout" size={18} />
          Sign out
        </button>
      </div>
    </div>
  );
}
