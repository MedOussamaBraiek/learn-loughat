import type { Dialog } from '../data/dialogs';
import { buildDialogQuestions } from '../data/dialogs';
import { McqGame } from './McqGame';

interface DialogGameProps {
  dialog: Dialog;
  title: string;
  onBack: () => void;
}

// "Fill the missing reply": pick the phrase that belongs in each blank.
export function DialogGame({ dialog, title, onBack }: DialogGameProps) {
  const build = () => buildDialogQuestions(dialog);
  return <McqGame title={title} questions={build()} onBack={onBack} onReplay={build} />;
}
