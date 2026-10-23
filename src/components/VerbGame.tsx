import { generateVerbQuestions } from '../data/generators';
import type { VerbGameKind } from '../data/verbs';
import { McqGame } from './McqGame';

const TOTAL = 10;

interface VerbGameProps {
  kind: VerbGameKind;
  title: string;
  onBack: () => void;
}

// Quick game for one verb skill. The questions are generated once per round.
export function VerbGame({ kind, title, onBack }: VerbGameProps) {
  const build = () => generateVerbQuestions(kind, TOTAL);
  return <McqGame title={title} questions={build()} onBack={onBack} onReplay={build} />;
}
