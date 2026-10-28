import { signInWithGoogle } from '../lib/rankings';
import { dayKey } from '../lib/daily';
import { Leaderboard } from './Leaderboard';
import { supabase } from '../lib/supabase';
import { useAuthUser } from '../lib/useAuthUser';
import { Navbar } from './Navbar';
import { Icon, type IconName } from './Icon';

const features: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'bookOpen', title: 'Structured Lessons', desc: 'Learn German step by step with clear grammar explanations and real examples.' },
  { icon: 'image', title: 'Picture Learning', desc: 'Master vocabulary through interactive visual scenes with real-life contexts.' },
  { icon: 'gamepad', title: 'Word Games', desc: 'Fun matching games and challenges to reinforce what you learn.' },
  { icon: 'listChecks', title: 'Smart Quizzes', desc: 'Practice at your pace or test yourself with timed challenges.' },
  { icon: 'flame', title: 'Daily Challenge', desc: 'New questions every day. Build your streak and climb the leaderboard.' },
  { icon: 'trophy', title: 'Track Progress', desc: 'See your improvement with detailed stats and rankings.' },
];

interface SignInProps {
  showApp?: boolean;
  onEnterApp?: () => void;
  isAdmin?: boolean;
  onAdmin?: () => void;
}

export function SignIn({ onEnterApp, isAdmin, onAdmin }: SignInProps) {
  const auth = useAuthUser();
  const start = () => {
    if (supabase) {
      void signInWithGoogle();
    } else if (onEnterApp) {
      onEnterApp();
    }
  };

  const enter = () => {
    onEnterApp?.();
  };

  return (
    <div className="lp">
      <Navbar onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} signedIn={!!auth.user} isAdmin={isAdmin} onAdmin={onAdmin} />

      <section className="lp-hero">
        <div className="lp-hero-container">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">
              <Icon name="flag" size={15} />
              #1 German Learning Platform
            </div>
            <h1 className="lp-hero-title">
              Learn German <span className="lp-hero-title-accent">the Smart Way</span>
            </h1>
            <p className="lp-hero-subtitle">
              Master German from A1 to B2 with interactive lessons, picture games, quizzes, and daily challenges. Learn at your own pace with a premium educational experience.
            </p>
            <div className="lp-hero-actions">
              {auth.user ? (
                <button type="button" className="lp-btn lp-btn-primary lp-btn-shadow" onClick={enter}>
                  Start learning
                  <Icon name="arrowRight" size={18} />
                </button>
              ) : (
                <>
                  <button type="button" className="lp-btn lp-btn-primary lp-btn-shadow" onClick={start}>
                    Get Started Free
                    <Icon name="arrowRight" size={18} />
                  </button>
                  <button type="button" className="lp-btn lp-btn-secondary" onClick={start}>
                    <Icon name="login" size={18} />
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
                <div className="lp-hero-card-badge">
                  <Icon name="flame" size={15} />
                  Streak: 7 days
                </div>
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
            {features.map((feature) => (
              <div key={feature.title} className="lp-feature-card">
                <span className="lp-feature-icon">
                  <Icon name={feature.icon} size={26} />
                </span>
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
              <button type="button" className="lp-btn lp-btn-primary lp-btn-shadow large" onClick={enter}>
                Start learning
                <Icon name="arrowRight" size={18} />
              </button>
            ) : (
              <button type="button" className="lp-btn lp-btn-primary lp-btn-shadow large" onClick={start}>
                Start Learning for Free
                <Icon name="arrowRight" size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-content">
            <div className="lp-footer-logo">
              <span className="app-navbar-logo-mark">
                <Icon name="bookOpen" size={18} />
              </span>
              <span className="lp-logo-text">Learn Loughat</span>
            </div>
            <p className="lp-footer-text">© 2026 Learn Loughat. Master German with confidence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
