import { useMemo, useState } from 'react';
import type { LearnLanguage } from '../types';
import type { SceneInfo } from '../data/scenes';
import { SceneArt } from './SceneArt';
import { useTTS } from '../hooks/useTTS';

interface SceneBoardProps {
  scene: SceneInfo;
  learnLang: LearnLanguage;
  onBack: () => void;
}

const VW = 420;
const VH = 520;

// Each item gets its own color in Learn mode, so label, arrow and dot match
const palette = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#e84393', '#00b894', '#6c5ce7', '#d35400', '#0984e3'];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface DragState {
  id: string;
  x: number;
  y: number;
  moved: boolean;
}

export function SceneBoard({ scene, learnLang, onBack }: SceneBoardProps) {
  const { speak } = useTTS();
  const [mode, setMode] = useState<'learn' | 'play'>('learn');
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [chipSel, setChipSel] = useState<string | null>(null);
  const [spotSel, setSpotSel] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [hoverSpot, setHoverSpot] = useState<string | null>(null);
  const [bank, setBank] = useState(() => shuffle(scene.items.map((i) => i.id)));

  const colorOf = useMemo(() => {
    const map: Record<string, string> = {};
    scene.items.forEach((item, idx) => { map[item.id] = palette[idx % palette.length]; });
    return map;
  }, [scene]);

  // Each label gets a fixed slot in its column, ordered top to bottom
  const slotTop = useMemo(() => {
    const map: Record<string, number> = {};
    (['l', 'r'] as const).forEach((side) => {
      const list = scene.items.filter((i) => i.side === side).sort((a, b) => a.y - b.y);
      list.forEach((item, idx) => {
        map[item.id] = ((idx + 0.5) / list.length) * 100;
      });
    });
    return map;
  }, [scene]);

  const solvedAll = solved.size === scene.items.length;
  const itemLabel = (id: string) => scene.items.find((i) => i.id === id)?.en ?? '';

  const speakItem = (id: string) => speak(id, learnLang);

  const attempt = (itemId: string, spotId: string) => {
    if (solved.has(itemId)) return;
    if (itemId === spotId) {
      setSolved((prev) => new Set(prev).add(itemId));
      setChipSel(null);
      setSpotSel(null);
      setMessage({ ok: true, text: `✅ ${itemId} (${itemLabel(itemId)})` });
      speakItem(itemId);
      return;
    }
    setMistakes((m) => m + 1);
    setWrongId(spotId);
    setTimeout(() => setWrongId(null), 600);
    setMessage({ ok: false, text: `❌ That spot is ${spotId}, not ${itemId}.` });
  };

  const onSpotClick = (id: string) => {
    if (mode === 'learn') {
      speakItem(id);
      return;
    }
    if (solved.has(id)) return;
    if (chipSel) {
      attempt(chipSel, id);
      setChipSel(null);
    } else {
      setSpotSel(id === spotSel ? null : id);
    }
  };

  const onChipClick = (id: string) => {
    if (mode === 'learn') {
      speakItem(id);
      return;
    }
    if (solved.has(id)) return;
    if (spotSel) {
      attempt(id, spotSel);
      setSpotSel(null);
    } else {
      setChipSel(id === chipSel ? null : id);
    }
  };

  // Pointer-based drag works with mouse and touch alike
  const spotUnder = (x: number, y: number): string | null => {
    const el = document.elementFromPoint(x, y);
    return el?.closest('[data-spot]')?.getAttribute('data-spot') ?? null;
  };

  const onChipPointerDown = (e: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (mode !== 'play' || solved.has(id)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ id, x: e.clientX, y: e.clientY, moved: false });
  };

  const onChipPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const moved = drag.moved || Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6;
    setDrag({ ...drag, x: e.clientX, y: e.clientY, moved });
    setHoverSpot(spotUnder(e.clientX, e.clientY));
  };

  const onChipPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    if (drag.moved) {
      const target = spotUnder(e.clientX, e.clientY);
      if (target) attempt(drag.id, target);
    } else {
      onChipClick(drag.id);
    }
    setDrag(null);
    setHoverSpot(null);
  };

  const showAnswer = () => {
    if (!spotSel) return;
    setSolved((prev) => new Set(prev).add(spotSel));
    setMessage({ ok: true, text: `💡 ${spotSel} (${itemLabel(spotSel)})` });
    speakItem(spotSel);
    setSpotSel(null);
    setChipSel(null);
  };

  const restart = () => {
    setSolved(new Set());
    setChipSel(null);
    setSpotSel(null);
    setMistakes(0);
    setMessage(null);
    setBank(shuffle(scene.items.map((i) => i.id)));
  };

  const showAll = mode === 'learn';

  let prompt = 'Drag a word onto its place on the picture. Or tap a word, then tap its place.';
  if (chipSel) prompt = `Now tap the place for ${chipSel}.`;
  if (spotSel) prompt = 'Now tap the word for this place (or 💡 reveal it).';

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">{scene.icon}</span>
          <h2 className="course-title">{scene.title}</h2>
        </div>
      </div>

      <div className="scene-modes">
        <button className={`scene-mode-btn${mode === 'learn' ? ' active' : ''}`} onClick={() => setMode('learn')}>👀 Learn</button>
        <button className={`scene-mode-btn${mode === 'play' ? ' active' : ''}`} onClick={() => setMode('play')}>🎯 Play</button>
      </div>

      {mode === 'learn' && (
        <p className="match-hint">Tap a word or a dot to hear it.</p>
      )}

      {mode === 'play' && !solvedAll && (
        <>
          <p className="match-status">Found {solved.size} / {scene.items.length} · Mistakes: {mistakes}</p>
          <p className="scene-prompt">{prompt}</p>
        </>
      )}

      {mode === 'play' && message && (
        <p className={`scene-message ${message.ok ? 'ok' : 'bad'}`}>{message.text}</p>
      )}

      <div className="scene-board">
        <SceneArt kind={scene.kind} />

        {/* arrows from each label column to its place */}
        <svg className="scene-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {scene.items
            .filter((item) => showAll || solved.has(item.id))
            .map((item) => (
              <line
                key={item.id}
                x1={item.side === 'l' ? 28 : 72}
                y1={slotTop[item.id]}
                x2={(item.x / VW) * 100}
                y2={(item.y / VH) * 100}
                stroke={colorOf[item.id]}
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </svg>

        {/* label columns */}
        <div className="scene-col left">
          {scene.items.filter((i) => i.side === 'l').map((item) => renderChip(item))}
        </div>
        <div className="scene-col right">
          {scene.items.filter((i) => i.side === 'r').map((item) => renderChip(item))}
        </div>

        {/* places on the picture */}
        {scene.items.map((item) => {
          const done = solved.has(item.id);
          const classes = ['scene-spot'];
          if (done) classes.push('ok');
          if (spotSel === item.id) classes.push('sel');
          if (wrongId === item.id) classes.push('wrong');
          if (hoverSpot === item.id) classes.push('hover');
          if (mode === 'play' && !done) classes.push('target');
          const style: React.CSSProperties = {
            left: `${(item.x / VW) * 100}%`,
            top: `${(item.y / VH) * 100}%`,
          };
          if (mode === 'learn') style.background = colorOf[item.id];
          return (
            <button
              key={item.id}
              data-spot={item.id}
              className={classes.join(' ')}
              style={style}
              onClick={() => onSpotClick(item.id)}
              aria-label={item.id}
            >
              {done ? '✓' : ''}
            </button>
          );
        })}
      </div>

      {mode === 'play' && !solvedAll && (
        <>
          <div className="scene-bank">
            {bank.filter((id) => !solved.has(id)).map((id) => (
              <button
                key={id}
                className={`scene-bank-chip${chipSel === id ? ' sel' : ''}${drag?.id === id && drag.moved ? ' dragging' : ''}`}
                onPointerDown={(e) => onChipPointerDown(e, id)}
                onPointerMove={onChipPointerMove}
                onPointerUp={onChipPointerUp}
                onPointerCancel={() => { setDrag(null); setHoverSpot(null); }}
              >
                {id}
              </button>
            ))}
          </div>
          {spotSel && (
            <div className="scene-answer">
              <button className="action-btn secondary" onClick={showAnswer}>💡 Show answer</button>
            </div>
          )}
        </>
      )}

      {drag?.moved && (
        <div className="scene-ghost" style={{ left: drag.x, top: drag.y }}>{drag.id}</div>
      )}

      {mode === 'play' && solvedAll && (
        <div className="match-finished">
          <h3>🎉 Great job!</h3>
          <p>Total mistakes: {mistakes}</p>
          <div className="scene-finish-actions">
            <button className="action-btn primary" onClick={restart}>Play again</button>
            <button className="action-btn secondary" onClick={onBack}>Back</button>
          </div>
        </div>
      )}
    </div>
  );

  function renderChip(item: SceneInfo['items'][number]) {
    const done = solved.has(item.id);
    const show = showAll || done;
    const classes = ['scene-chip'];
    if (!show) classes.push('placeholder');
    if (done) classes.push('solved');
    return (
      <div
        key={item.id}
        className={classes.join(' ')}
        style={{
          top: `${slotTop[item.id]}%`,
          borderColor: showAll || done ? colorOf[item.id] : undefined,
        }}
        onClick={() => { if (showAll) speakItem(item.id); }}
      >
        {show ? (
          <>
            {item.id}
            <small>{item.en}</small>
          </>
        ) : '?'}
      </div>
    );
  }
}
