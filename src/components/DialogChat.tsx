import { useState } from 'react';
import { getDialog } from '../data/dialogs';
import { useTTS } from '../hooks/useTTS';
import { useGloss } from '../i18n/GlossContext';
import { useTx } from '../i18n/uiText';
import { GlossToggle } from './GlossToggle';
import { PersonSprite, SceneBackdrop } from './DialogScene';
import { DialogGame } from './DialogGame';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

interface DialogChatProps {
  dialogId: string;
  onBack: () => void;
}

// Read a conversation over a full-screen picture of the place, then practise it as a game.
export function DialogChat({ dialogId, onBack }: DialogChatProps) {
  const dialog = getDialog(dialogId);
  const { speak } = useTTS();
  const { gloss } = useGloss();
  const tx = useTx();
  const [playing, setPlaying] = useState(false);

  if (!dialog) {
    return (
      <div className="course-screen">
        <div className="course-header">
          <button type="button" className="back-btn" onClick={onBack} aria-label={tx('common.back')}>
            <Icon name="arrowLeft" size={20} />
          </button>
          <h2 className="course-title">Not found</h2>
        </div>
        <button type="button" className="action-btn secondary" onClick={onBack}>{tx('common.back')}</button>
      </div>
    );
  }

  if (playing) {
    return <DialogGame dialog={dialog} title={tx('dialogues.play')} onBack={() => setPlaying(false)} />;
  }

  const nameFor = (who: 'a' | 'b') => (who === 'a' ? dialog.a : dialog.b);

  return (
    <div className="dialog-full" dir="ltr">
      <div className="dialog-bg">
        <SceneBackdrop place={dialog.place} />
      </div>
      <PersonSprite side="left" name={dialog.a} shirt="#1cb0f6" hair="#5a3b26" />
      <PersonSprite side="right" name={dialog.b} shirt="#ff9600" hair="#2f2a26" />

      <div className="dialog-overlay">
        <header className="dialog-top">
          <button type="button" className="dialog-back" onClick={onBack} aria-label={tx('common.back')}>
            <Icon name="arrowLeft" size={20} />
          </button>
          <div className="dialog-title-wrap">
            <span className="dialog-icon"><Pictogram emoji={dialog.icon} size={20} /></span>
            <h2>{dialog.title}</h2>
          </div>
          <div className="dialog-top-gloss">
            <GlossToggle />
          </div>
        </header>

        <div className="dialog-scroll">
          <div className="dialog-chat">
            {dialog.lines.map((line, i) => {
              const name = nameFor(line.who);
              return (
                <div key={i} className={`dialog-msg ${line.who}`}>
                  <span className="dialog-avatar">{name.charAt(0)}</span>
                  <div className="dialog-bubble">
                    <div className="dialog-say">
                      <strong className="dialog-name">{name}</strong>
                      <button type="button" className="speak-btn-small" onClick={() => speak(line.de, 'de')} aria-label={tx('dialogues.listen')}>
                        <Icon name="volume" size={15} />
                      </button>
                    </div>
                    <p className="dialog-de" dir="ltr">{line.de}</p>
                    <p className="dialog-tr" dir={gloss === 'ar' ? 'rtl' : 'ltr'}>{gloss === 'ar' ? line.ar : line.en}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <footer className="dialog-footer">
          <button type="button" className="next-btn active dialog-play" onClick={() => setPlaying(true)}>
            <Icon name="gamepad" size={18} />
            {tx('dialogues.play')}
          </button>
        </footer>
      </div>
    </div>
  );
}
