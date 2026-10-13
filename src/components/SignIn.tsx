import { signInWithGoogle } from '../lib/rankings';
import { dayKey } from '../lib/daily';
import { Leaderboard } from './Leaderboard';

const features = [
  { icon: '📖', title: 'Lessons & grammar', text: 'Articles, cases, verbs and sentence patterns explained step by step.' },
  { icon: '🖼️', title: 'Picture games', text: 'Drag each word onto the right place on the picture. Body, house, clothes, family, animals and transport.' },
  { icon: '🎮', title: 'Word games', text: 'Match German words with their meaning in English or Arabic.' },
  { icon: '📝', title: 'Quizzes', text: 'Practice at your own pace, or test yourself with a 20-second timer per question.' },
  { icon: '🔥', title: 'Daily challenge', text: 'A new set of questions every day. One attempt, then check your rank.' },
  { icon: '🏆', title: 'Rankings', text: 'Compete today, this week or this month with other learners.' },
];

const pictures = [
  { icon: '🧍', title: 'Body' },
  { icon: '🏠', title: 'House' },
  { icon: '👔', title: 'Clothes (men)' },
  { icon: '👗', title: 'Clothes (women)' },
  { icon: '👪', title: 'Family' },
  { icon: '🐶', title: 'Animals' },
  { icon: '🚗', title: 'Transport' },
];

const levels = [
  { label: 'A1', name: 'Beginner' },
  { label: 'A2', name: 'Elementary' },
  { label: 'B1', name: 'Intermediate' },
  { label: 'B2', name: 'Upper intermediate' },
];

const steps = [
  { n: '1', title: 'Sign in', text: 'Use your Google account. No password to remember.' },
  { n: '2', title: 'Choose your level', text: 'Start at A1 or pick the level you already know.' },
  { n: '3', title: 'Learn and play', text: 'Study, play the picture and word games, and take the daily challenge.' },
];

// Landing page shown before sign-in: what the app offers, then the sign-in button
export function SignIn() {
  const start = () => { void signInWithGoogle(); };

  return (
    <div className="landing">
      <section className="landing-hero">
        <span className="owl-icon">🦉</span>
        <h1 className="app-title">Learn Loughat</h1>
        <p className="landing-tagline">Learn German step by step, with pictures, games and a daily challenge.</p>
        <p className="landing-sub">Also available: French, Spanish, English and Arabic. Levels A1 to B2.</p>
        <button className="action-btn primary landing-cta" onClick={start}>Sign in with Google to start</button>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">What you can do</h2>
        <div className="landing-features">
          {features.map((f) => (
            <div key={f.title} className="landing-feature">
              <span className="landing-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Picture sets</h2>
        <p className="landing-sub">Each word sits on a picture. Drag it to the right place, or tap to hear it.</p>
        <div className="landing-pictures">
          {pictures.map((p) => (
            <span key={p.title} className="landing-chip">{p.icon} {p.title}</span>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Levels</h2>
        <div className="landing-levels">
          {levels.map((l) => (
            <div key={l.label} className="landing-level">
              <span className="level-badge">{l.label}</span>
              <span>{l.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Rankings</h2>
        <p className="landing-sub">Top learners in the daily challenge. Pick a level to see its ranking.</p>
        <Leaderboard today={dayKey()} lang="de" initialLevel="A1" />
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">How it works</h2>
        <div className="landing-steps">
          {steps.map((s) => (
            <div key={s.n} className="landing-step">
              <span className="landing-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-bottom">
        <button className="action-btn primary landing-cta" onClick={start}>Sign in with Google to start</button>
      </section>
    </div>
  );
}
