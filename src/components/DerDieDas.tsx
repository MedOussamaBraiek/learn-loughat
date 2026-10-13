import { useMemo, useState } from 'react';
import type { Level } from '../types';
import { getTopics } from '../data/topics';

interface DerDieDasProps {
  onBack: () => void;
}

// Common endings that predict the article. "Mostly" means there are exceptions.
const rules: { article: 'der' | 'die' | 'das'; endings: string[]; examples: string; note: string }[] = [
  { article: 'die', endings: ['-ung', '-heit', '-keit', '-schaft', '-tät', '-ion'], examples: 'die Zeitung, die Freiheit, die Möglichkeit, die Freundschaft', note: 'Almost always feminine.' },
  { article: 'die', endings: ['-ei', '-ik', '-ur'], examples: 'die Bäckerei, die Musik, die Kultur', note: 'Feminine.' },
  { article: 'der', endings: ['-ling', '-ismus', '-or', '-ig'], examples: 'der Frühling, der Tourismus, der Doktor, der König', note: 'Masculine.' },
  { article: 'der', endings: ['-er'], examples: 'der Lehrer, der Computer', note: 'Mostly masculine. Exceptions: das Fenster, das Zimmer, das Wasser.' },
  { article: 'das', endings: ['-chen', '-lein'], examples: 'das Mädchen, das Brötchen', note: 'Always neuter (the -chen / -lein ending makes it small).' },
  { article: 'das', endings: ['-um', '-ment', '-tum'], examples: 'das Museum, das Dokument, das Eigentum', note: 'Neuter.' },
];

const articleColor: Record<string, string> = { der: '#1cb0f6', die: '#ff4b4b', das: '#58cc02' };

// Which ending rule (if any) explains the article of this word
function ruleFor(word: string) {
  const lower = word.toLowerCase();
  return rules.find((r) => r.endings.some((e) => lower.endsWith(e.slice(1))));
}

export function DerDieDas({ onBack }: DerDieDasProps) {
  const [query, setQuery] = useState('');

  // Every German noun from all word lists, without duplicates
  const allWords = useMemo(() => {
    const seen = new Map<string, { word: string; article: string; plural: string; translation: string }>();
    (['A1', 'A2', 'B1', 'B2'] as Level[]).forEach((level) => {
      getTopics('de', level).forEach((topic) => {
        topic.words.forEach((w) => {
          if (w.article && !seen.has(`${w.article} ${w.word}`)) seen.set(`${w.article} ${w.word}`, w);
        });
      });
    });
    return [...seen.values()];
  }, []);

  const q = query.trim().toLowerCase();
  const results = q ? allWords.filter((w) => w.word.toLowerCase().includes(q)).slice(0, 20) : [];

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <h2 className="course-title">der · die · das helper</h2>
        </div>
      </div>

      <p className="match-hint">Every German noun has one article: der, die or das. The ending of a word often tells you which one.</p>

      <h3 className="memory-section-title">🔍 Look up a word</h3>
      <input
        className="admin-search"
        type="search"
        placeholder="Type a German word, e.g. Zeitung or Kind"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {q && results.length === 0 && <p className="match-hint">Not in the word lists yet. Try the endings below.</p>}
      <div className="helper-results">
        {results.map((w) => {
          const rule = ruleFor(w.word);
          return (
            <div key={`${w.article}-${w.word}`} className="helper-result" style={{ '--art': articleColor[w.article] } as React.CSSProperties}>
              <span className="helper-article">{w.article}</span>
              <div className="helper-word">
                <strong>{w.word}</strong>
                <span>{w.translation}</span>
                <small>{rule ? `Ending rule: ${rule.article}, ${rule.endings.join(', ')}` : 'No simple ending rule. Learn it with its article.'}</small>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="memory-section-title">📏 Ending rules</h3>
      <div className="helper-rules">
        {rules.map((r) => (
          <div key={r.endings.join()} className="helper-rule" style={{ '--art': articleColor[r.article] } as React.CSSProperties}>
            <span className="helper-rule-article">{r.article}</span>
            <div>
              <div className="helper-rule-endings">{r.endings.map((e) => <code key={e}>{e}</code>)}</div>
              <p>{r.note}</p>
              <small>{r.examples}</small>
            </div>
          </div>
        ))}
      </div>
      <p className="match-hint">Tip: learn each noun together with its article, e.g. "die Zeitung", never just "Zeitung".</p>
    </div>
  );
}
