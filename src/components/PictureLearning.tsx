import { useState } from 'react';
import type { LearnLanguage } from '../types';
import { pictureScenes, type SceneKind } from '../data/scenes';
import { SceneBoard } from './SceneBoard';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

interface PictureLearningProps {
  learnLang: LearnLanguage;
  onBack: () => void;
}

// Menu of picture games; picking one opens its board. Back on the board returns to the menu.
export function PictureLearning({ learnLang, onBack }: PictureLearningProps) {
  const [kind, setKind] = useState<SceneKind | null>(null);
  const scene = pictureScenes.find((s) => s.kind === kind);

  if (scene) {
    return <SceneBoard key={scene.kind} scene={scene} learnLang={learnLang} onBack={() => setKind(null)} />;
  }

  return (
    <div className="course-screen">
      <div className="course-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="course-unit-icon big"><Icon name="image" size={26} /></span>
          <h2 className="course-title">Picture learning</h2>
        </div>
      </div>
      <p className="match-hint">Pick a picture. Learn the words with arrows, then play to test yourself.</p>
      <div className="course-unit-grid">
        {pictureScenes.map((s) => (
          <button
            key={s.kind}
            type="button"
            className="course-unit"
            style={{ '--topic-color': s.color } as React.CSSProperties}
            onClick={() => setKind(s.kind)}
          >
            <span className="course-unit-icon"><Pictogram emoji={s.icon} size={22} /></span>
            <span className="course-unit-title">{s.title}</span>
            <span className="course-unit-meta">{s.items.length} words</span>
          </button>
        ))}
      </div>
    </div>
  );
}
