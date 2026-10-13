import { signOut } from '../lib/rankings';

// Shown to a signed-in user whose account the admin has blocked
export function Blocked() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <span className="owl-icon">🦉</span>
        <h1 className="app-title">Account blocked</h1>
        <p className="landing-sub">Your account has been blocked, so you can't use Learn Loughat right now. Please contact the admin if you think this is a mistake.</p>
        <button className="action-btn secondary landing-cta" onClick={() => { void signOut(); }}>🚪 Sign out</button>
      </section>
    </div>
  );
}
