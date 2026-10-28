import { useEffect, useMemo, useState } from 'react';
import type { TopicUnit, LearnLanguage } from '../types';
import { useTTS } from '../hooks/useTTS';
import { useGloss } from '../i18n/GlossContext';
import { GlossToggle } from './GlossToggle';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

interface WordMatchProps {
  topic: TopicUnit;
  learnLang: LearnLanguage;
  onBack: () => void;
}

const GROUP_SIZE = 6;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function WordMatch({ topic, learnLang, onBack }: WordMatchProps) {
  const { speak } = useTTS();
  const { gloss } = useGloss();
  // The meaning shown on the right: English or Arabic, never both
  const meaningOf = (w: TopicUnit['words'][number]) => (gloss === 'ar' && w.ar ? w.ar : w.translation);

  // Split the shuffled topic into rounds of GROUP_SIZE pairs
  const groups = useMemo(() => {
    const shuffled = shuffle(topic.words);
    const result = [];
    for (let i = 0; i < shuffled.length; i += GROUP_SIZE) {
      result.push(shuffled.slice(i, i + GROUP_SIZE));
    }
    return result;
  }, [topic]);

  const [groupIndex, setGroupIndex] = useState(0);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [selRight, setSelRight] = useState<number | null>(null);
  const [wrongPair, setWrongPair] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const group = groups[groupIndex] ?? [];

  // Translations are shuffled separately from the German words, once per round
  const shuffledIndices = (n: number) => shuffle(Array.from({ length: n }, (_, i) => i));
  const [rightOrder, setRightOrder] = useState<number[]>(() => shuffledIndices(group.length));

  // Compare the two selected tiles once both are picked
  useEffect(() => {
    if (selLeft === null || selRight === null) return;
    if (selLeft === selRight) {
      setMatched((prev) => new Set(prev).add(selLeft));
      setSelLeft(null);
      setSelRight(null);
      return;
    }
    setMistakes((m) => m + 1);
    setWrongPair(true);
    const timer = setTimeout(() => {
      setSelLeft(null);
      setSelRight(null);
      setWrongPair(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [selLeft, selRight]);

  const pickLeft = (i: number) => {
    if (wrongPair || matched.has(i)) return;
    setSelLeft(i);
    const w = group[i];
    speak(w.article ? `${w.article} ${w.word}` : w.word, learnLang);
  };

  const pickRight = (k: number) => {
    if (wrongPair || matched.has(k)) return;
    setSelRight(k);
  };

  const roundDone = group.length > 0 && matched.size === group.length;

  // One clear instruction that always says what the next tap should be
  const waitingLeft = selLeft === null && selRight !== null;
  const waitingRight = selRight === null && selLeft !== null;
  let instruction = 'Step 1: tap a German word on the left.';
  if (wrongPair) instruction = 'Not a match. Try again.';
  else if (selLeft !== null && selRight === null) instruction = `You picked ${group[selLeft].article ? group[selLeft].article + ' ' : ''}${group[selLeft].word}. Now tap its meaning on the right.`;
  else if (selRight !== null && selLeft === null) instruction = `You picked "${meaningOf(group[selRight])}". Now tap the German word on the left.`;
  const isLastRound = groupIndex === groups.length - 1;

  const nextRound = () => {
    setRightOrder(shuffledIndices(groups[groupIndex + 1]?.length ?? 0));
    setGroupIndex((g) => g + 1);
    setMatched(new Set());
    setSelLeft(null);
    setSelRight(null);
    setWrongPair(false);
  };

  return (
    <div className="course-screen">
      <div className="course-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="course-unit-icon big"><Pictogram emoji={topic.icon} size={26} /></span>
          <h2 className="course-title">{topic.title} · Match</h2>
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="course-empty">No words to match yet.</p>
      ) : (
        <>
          <p className="match-status">
            Round {groupIndex + 1} / {groups.length} · Mistakes: {mistakes}
          </p>
          <GlossToggle />
          <p className={`match-step${wrongPair ? ' bad' : ''}`}>{instruction}</p>

          <div className="match-headers">
            <span>
              <Icon name="flag" size={15} />
              Deutsch
            </span>
            <span>
              <Icon name="languages" size={15} />
              {gloss === 'ar' ? 'العربية' : 'English'}
            </span>
          </div>

          <div className="match-columns">
            <div className={`match-col${waitingLeft ? ' waiting' : ''}`}>
              {group.map((w, i) => {
                const isMatched = matched.has(i);
                const isSelected = selLeft === i;
                const isWrong = wrongPair && isSelected;
                return (
                  <button
                    key={`${w.word}-${i}`}
                    className={`match-tile${isMatched ? ' matched' : ''}${isSelected ? ' selected' : ''}${isWrong ? ' wrong' : ''}`}
                    onClick={() => pickLeft(i)}
                    disabled={isMatched}
                  >
                    {w.article ? `${w.article} ${w.word}` : w.word}
                  </button>
                );
              })}
            </div>

            <div className={`match-col${waitingRight ? ' waiting' : ''}`}>
              {rightOrder.map((k) => {
                const isMatched = matched.has(k);
                const isSelected = selRight === k;
                const isWrong = wrongPair && isSelected;
                return (
                  <button
                    key={k}
                    className={`match-tile${isMatched ? ' matched' : ''}${isSelected ? ' selected' : ''}${isWrong ? ' wrong' : ''}`}
                    onClick={() => pickRight(k)}
                    disabled={isMatched}
                  >
                    <span dir={gloss === 'ar' && group[k].ar ? 'rtl' : undefined}>{meaningOf(group[k])}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {roundDone && !isLastRound && (
            <button type="button" className="action-btn primary match-next" onClick={nextRound}>
              Next round
              <Icon name="arrowRight" size={18} />
            </button>
          )}

          {roundDone && isLastRound && (
            <div className="match-finished">
              <h3>
                <Icon name="sparkles" size={22} />
                All pairs matched!
              </h3>
              <p>Total mistakes: {mistakes}</p>
              <button type="button" className="action-btn secondary" onClick={onBack}>Back to topic</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
