import { signOut } from '../lib/rankings';

// Shown to a signed-in user whose account the admin has blocked
export function Blocked() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <span className="owl-icon">🚫</span>
        <h1 className="landing-hero-title" style={{ fontSize: '40px' }}>Account Blocked</h1>
        <p className="landing-tagline">Your account has been blocked, so you can't access Learn Loughat right now.</p>
        <p className="landing-sub">Please contact the administrator if you believe this is a mistake.</p>
        <button className="landing-primary-btn" onClick={() => { void signOut(); }}>🚪 Sign Out</button>
      </section>
    </div>
  );
}
