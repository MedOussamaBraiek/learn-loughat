import { useCallback } from 'react';

const langMap: Record<string, string> = {
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  en: 'en-US',
  ar: 'ar-SA',
};

const normalize = (s: string) => s.replace('_', '-').toLowerCase();

// Pick a voice for the language. Exact locale first (de-DE), then any voice of that language.
// Without this, the browser falls back to its default voice, which reads German with English sounds.
function findVoice(lang: string): SpeechSynthesisVoice | null {
  const locale = langMap[lang];
  if (!locale) return null;
  const voices = window.speechSynthesis.getVoices();
  const exact = voices.filter((v) => normalize(v.lang) === normalize(locale));
  const sameLanguage = voices.filter((v) => normalize(v.lang).startsWith(lang));
  const pool = exact.length > 0 ? exact : sameLanguage;
  return pool.find((v) => /microsoft|google/i.test(v.name)) ?? pool[0] ?? null;
}

export function useTTS() {
  const speak = useCallback((text: string, lang: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const doSpeak = () => {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langMap[lang] || lang;
      utterance.rate = 0.85;
      utterance.pitch = 1;
      // No real voice for this language: stay silent instead of reading German with an English voice
      const voice = findVoice(lang);
      if (!voice) {
        console.warn(`No ${utterance.lang} voice installed. Install it in Windows Settings > Time & language > Speech.`);
        return;
      }
      utterance.voice = voice;
      synth.speak(utterance);
    };

    // Voices load asynchronously in most browsers. If they are not ready yet,
    // wait for them, so the first word is not spoken with the default voice.
    if (synth.getVoices().length === 0) {
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        doSpeak();
      };
      synth.addEventListener('voiceschanged', start, { once: true });
      setTimeout(start, 500);
    } else {
      doSpeak();
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
  }, []);

  return { speak, stop };
}
