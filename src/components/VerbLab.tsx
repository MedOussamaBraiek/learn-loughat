import { useState } from 'react';
import type { ReactNode } from 'react';
import type { PastVerb } from '../types';
import { importantVerbs, verbAdvice, type VerbTense, type VerbGameKind } from '../data/verbs';
import { useTx, type UiKey } from '../i18n/uiText';
import { useTTS } from '../hooks/useTTS';
import { VerbGame } from './VerbGame';

interface VerbLabProps {
  onBack: () => void;
}

type VerbTab = 'overview' | VerbTense;

const tabs: { key: VerbTab; icon: string; labelKey: UiKey }[] = [
  { key: 'overview', icon: '⭐', labelKey: 'verbs.tabOverview' },
  { key: 'perfekt', icon: '🕰️', labelKey: 'verbs.tabPerfekt' },
  { key: 'praeteritum', icon: '📜', labelKey: 'verbs.tabPraeteritum' },
  { key: 'imperativ', icon: '❗', labelKey: 'verbs.tabImperativ' },
];

const heads: Record<VerbTab, UiKey[]> = {
  overview: ['verbs.colVerb', 'verbs.colPraeteritum', 'verbs.colPartizip', 'verbs.colAux'],
  perfekt: ['verbs.colVerb', 'verbs.colPartizip', 'verbs.colAux', 'verbs.colExample'],
  praeteritum: ['verbs.colVerb', 'verbs.colPraeteritum'],
  imperativ: ['verbs.colVerb', 'verbs.colDu', 'verbs.colIhr', 'verbs.colSie'],
};

const gamesByTab: Record<VerbTense, { kind: VerbGameKind; labelKey: UiKey; icon: string }[]> = {
  perfekt: [
    { kind: 'perfekt', labelKey: 'verbs.gamePartizip', icon: '🧩' },
    { kind: 'auxiliary', labelKey: 'verbs.gameAux', icon: '⚖️' },
  ],
  praeteritum: [{ kind: 'praeteritum', labelKey: 'verbs.gamePraeteritum', icon: '📜' }],
  imperativ: [{ kind: 'imperative', labelKey: 'verbs.gameImperative', icon: '❗' }],
};

export function VerbLab({ onBack }: VerbLabProps) {
  const { speak } = useTTS();
  const tx = useTx();
  const [tab, setTab] = useState<VerbTab>('overview');
  const [aux, setAux] = useState<'haben' | 'sein'>('haben');
  const [game, setGame] = useState<{ kind: VerbGameKind; title: string } | null>(null);

  if (game) {
    return <VerbGame kind={game.kind} title={game.title} onBack={() => setGame(null)} />;
  }

  const infCell = (v: PastVerb) => (
    <span key="inf" className="verb-cell verb-inf">
      <button className="speak-btn-small" onClick={() => speak(v.infinitive, 'de')} title={tx('verbs.listen')}>🔊</button>
      <span className="verb-inf-main">
        <strong>{v.infinitive}</strong>
        <em className="verb-trans">{v.translation}</em>
      </span>
    </span>
  );

  const exampleCell = (v: PastVerb) => (
    <span key="ex" className="verb-cell verb-example">
      <button className="speak-btn-small" onClick={() => speak(v.example.de, 'de')} title={tx('verbs.listen')}>🔊</button>
      <span className="verb-example-main">
        {v.example.de}
        <em className="verb-example-en">{v.example.en}</em>
      </span>
    </span>
  );

  const auxCell = (v: PastVerb) => (
    <span key="aux" className={`verb-cell verb-aux verb-aux-${v.auxiliary}`}>{v.auxiliary}</span>
  );

  const rowFor = (v: PastVerb): ReactNode[] => {
    if (tab === 'overview') {
      return [
        infCell(v),
        <span key="pr" className="verb-cell verb-partizip">{v.praeteritum}</span>,
        <span key="pa" className="verb-cell verb-partizip">{v.partizip}</span>,
        auxCell(v),
      ];
    }
    if (tab === 'perfekt') {
      return [
        infCell(v),
        <span key="pa" className="verb-cell verb-partizip">{v.partizip}</span>,
        auxCell(v),
        exampleCell(v),
      ];
    }
    if (tab === 'praeteritum') {
      return [
        infCell(v),
        <span key="pr" className="verb-cell verb-partizip">{v.praeteritum}</span>,
      ];
    }
    return [
      infCell(v),
      <span key="du" className="verb-cell verb-imp">{v.imperative.du}</span>,
      <span key="ihr" className="verb-cell verb-imp">{v.imperative.ihr}</span>,
      <span key="sie" className="verb-cell verb-imp">{v.imperative.sie}</span>,
    ];
  };

  const table = (list: PastVerb[]) => (
    <div className="verb-table-wrap">
      <div className={`verb-table verb-table-${tab}`}>
        <div className="verb-row verb-row-head">
          {heads[tab].map((key) => (
            <span key={key} className="verb-cell verb-th">{tx(key)}</span>
          ))}
        </div>
        {list.map((v) => (
          <div className="verb-row" key={v.infinitive}>{rowFor(v)}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="course-screen verb-lab">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">⏰</span>
          <h2 className="course-title">{tx('verbs.title')}</h2>
        </div>
      </div>

      <p className="match-hint">{tx('verbs.intro')}</p>

      <div className="tense-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tense-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="tense-tab-icon">{t.icon}</span>
            {tx(t.labelKey)}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <>
          <p className="match-hint">{tx('verbs.overviewHint')}</p>
          <h3 className="memory-section-title">⭐ {tx('verbs.importantVerbs')}</h3>
          {table(importantVerbs)}
        </>
      ) : (
        <>
          <div className="advice-cards">
            {verbAdvice[tab].map((a, i) => (
              <div key={i} className="advice-card">
                <span className="advice-icon">{a.icon}</span>
                <div className="advice-body">
                  <strong>{a.title}</strong>
                  <p>{a.text}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="memory-section-title">🎮 {tx('verbs.practise')}</h3>
          <p className="match-hint">{tx('verbs.practiseHint')}</p>
          <div className="game-launch-grid">
            {gamesByTab[tab].map((g) => (
              <button key={g.kind} className="game-launch-card" onClick={() => setGame({ kind: g.kind, title: tx(g.labelKey) })}>
                <span className="game-launch-icon">{g.icon}</span>
                <span className="game-launch-label">{tx(g.labelKey)}</span>
                <span className="game-launch-go">▶</span>
              </button>
            ))}
          </div>

          <h3 className="memory-section-title">⭐ {tx('verbs.importantVerbs')}</h3>
          {tab === 'perfekt' ? (
            <>
              <div className="aux-filter">
                <button className={`aux-filter-btn haben ${aux === 'haben' ? 'active' : ''}`} onClick={() => setAux('haben')}>{tx('verbs.withHaben')}</button>
                <button className={`aux-filter-btn sein ${aux === 'sein' ? 'active' : ''}`} onClick={() => setAux('sein')}>{tx('verbs.withSein')}</button>
              </div>
              {table(importantVerbs.filter((v) => v.auxiliary === aux))}
            </>
          ) : (
            table(importantVerbs)
          )}
        </>
      )}
    </div>
  );
}
