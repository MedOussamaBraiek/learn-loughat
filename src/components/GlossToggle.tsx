import { useGloss, type Gloss } from '../i18n/GlossContext';

const options: { value: Gloss; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
];

export function GlossToggle() {
  const { gloss, setGloss } = useGloss();
  return (
    <div className="gloss-row">
      <div className="gloss-toggle" role="group" aria-label="Translation language">
        {options.map((o) => (
          <button
            key={o.value}
            className={`gloss-btn${gloss === o.value ? ' active' : ''}`}
            aria-pressed={gloss === o.value}
            onClick={() => setGloss(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
