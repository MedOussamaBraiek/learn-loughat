import { signInWithGoogle, signOut } from '../lib/rankings';
import { dayKey } from '../lib/daily';
import { Leaderboard } from './Leaderboard';
import { supabase } from '../lib/supabase';
import { useAuthUser } from '../lib/useAuthUser';

const features = [
  { icon: '📖', title: 'Structured Lessons', desc: 'Learn German step by step with clear grammar explanations and real examples.' },
  { icon: '🖼️', title: 'Picture Learning', desc: 'Master vocabulary through interactive visual scenes with real-life contexts.' },
  { icon: '🎮', title: 'Word Games', desc: 'Fun matching games and challenges to reinforce what you learn.' },
  { icon: '📝', title: 'Smart Quizzes', desc: 'Practice at your pace or test yourself with timed challenges.' },
  { icon: '🔥', title: 'Daily Challenge', desc: 'New questions every day. Build your streak and climb the leaderboard.' },
  { icon: '🏆', title: 'Track Progress', desc: 'See your improvement with detailed stats and rankings.' },
];

interface SignInProps {
  showApp?: boolean;
  onEnterApp?: () => void;
}

export function SignIn({ showApp, onEnterApp }: SignInProps) {
  const auth = useAuthUser();
  const start = () => {
    if (supabase) {
      void signInWithGoogle();
    } else if (onEnterApp) {
      onEnterApp();
    }
  };
  const handleEnter = () => {
    if (onEnterApp) onEnterApp();
  };

  return (
    <div className="lp">
      <nav className="lp-nav">
        <div className="lp-nav-container">
          <div className="lp-logo">
            <span className="lp-logo-text">Learn Loughat</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {auth.user ? (
              <>
                {onEnterApp && (
                  <button type="button" className="lp-btn lp-btn-primary lp-btn-shadow" onClick={(e)=>{e.preventDefault();e.stopPropagation();onEnterApp?.();}} style={{ padding: '10px 20px' }}>
                    Enter to Start Learning
                  </button>
                )}
                <button type="button" className="lp-nav-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (supabase) void signOut(); else if (onEnterApp) onEnterApp(); }}>Disconnect</button>
              </>
            ) : (
              <>
                <button type="button" className="lp-nav-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); start(); }}>Connect</button>
                {onEnterApp && !supabase && (
                  <button type="button" className="lp-btn lp-btn-primary lp-btn-shadow" onClick={(e)=>{e.preventDefault();e.stopPropagation();onEnterApp?.();}} style={{ padding: '10px 20px' }}>
                    Enter to Start Learning
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="lp-hero">
        <div className="lp-hero-container">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">🇩🇪 #1 German Learning Platform</div>
            <h1 className="lp-hero-title">
              Learn German <span className="lp-hero-title-accent">the Smart Way</span>
            </h1>
            <p className="lp-hero-subtitle">
              Master German from A1 to B2 with interactive lessons, picture games, quizzes, and daily challenges. Learn at your own pace with a premium educational experience.
            </p>
            <div className="lp-hero-actions">
              {auth.user ? (
                <button className="lp-btn lp-btn-primary lp-btn-shadow " onClick={(e)=>{e.preventDefault();e.stopPropagation();onEnterApp?.();}}>
                  <span></span> Enter to Start Learning
                </button>
              ) : (
                <>
                  <button className="lp-btn lp-btn-primary lp-btn-shadow " onClick={start}>
                    <span></span> Get Started Free
                  </button>
                  <button className="lp-btn lp-btn-secondary" onClick={start}>
                    Connect with Google
                  </button>
                </>
              )}
            </div>
            <p className="lp-hero-note">No credit card required • Start learning in seconds</p>
          </div>
          <div className="lp-hero-visual">
            <div className="lp-hero-card">
              <div className="lp-hero-card-header">
                <div className="lp-hero-card-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="lp-hero-card-title">Daily Challenge</div>
              </div>
              <div className="lp-hero-card-body">
                <div className="lp-hero-card-question">Was ist das?</div>
                <div className="lp-hero-card-options">
                  <div className="lp-hero-card-option">der Tisch</div>
                  <div className="lp-hero-card-option active">die Katze</div>
                  <div className="lp-hero-card-option">das Buch</div>
                </div>
                <div className="lp-hero-card-badge">🔥 Streak: 7 days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-features">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Everything you need to master German</h2>
            <p className="lp-section-subtitle">A complete learning platform designed for effective and enjoyable German study</p>
          </div>
          <div className="lp-features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="lp-feature-card">
                <div className="lp-feature-icon">{feature.icon}</div>
                <h3 className="lp-feature-title">{feature.title}</h3>
                <p className="lp-feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-levels">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Structured for every level</h2>
            <p className="lp-section-subtitle">Follow a clear path from complete beginner to confident speaker</p>
          </div>
          <div className="lp-levels-grid">
            <div className="lp-level-card">
              <div className="lp-level-badge lp-level-a1">A1</div>
              <h3>Beginner</h3>
              <p>Basic greetings, introductions, and everyday phrases</p>
            </div>
            <div className="lp-level-card">
              <div className="lp-level-badge lp-level-a2">A2</div>
              <h3>Elementary</h3>
              <p>Daily routines, shopping, and simple conversations</p>
            </div>
            <div className="lp-level-card">
              <div className="lp-level-badge lp-level-b1">B1</div>
              <h3>Intermediate</h3>
              <p>Work, travel, and expressing opinions confidently</p>
            </div>
            <div className="lp-level-card">
              <div className="lp-level-badge lp-level-b2">B2</div>
              <h3>Upper Intermediate</h3>
              <p>Complex topics and nuanced German communication</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-leaderboard">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Compete and stay motivated</h2>
            <p className="lp-section-subtitle">Join the daily challenge and see how you rank against other learners</p>
          </div>
          <div className="lp-leaderboard-wrapper">
            <Leaderboard today={dayKey()} lang="de" initialLevel="A1" />
          </div>
        </div>
      </section>

      <section className="lp-cta">
        <div className="lp-container">
          <div className="lp-cta-card">
            <h2 className="lp-cta-title">Ready to start your German journey?</h2>
            <p className="lp-cta-subtitle">Join thousands of learners mastering German with Learn Loughat</p>
            {auth.user ? (
              <button className="lp-btn lp-btn-primary lp-btn-shadow large" onClick={(e)=>{e.preventDefault();e.stopPropagation();onEnterApp?.();}}>
                Enter to Start Learning
              </button>
            ) : (
              <button className="lp-btn lp-btn-primary lp-btn-shadow large" onClick={start}>
                Start Learning for Free
              </button>
            )}
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-content">
            <div className="lp-footer-logo">
              <span className="lp-logo-text">Learn Loughat</span>
            </div>
            <p className="lp-footer-text">© 2026 Learn Loughat. Master German with confidence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
