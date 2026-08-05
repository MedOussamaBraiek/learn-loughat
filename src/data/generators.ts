import type { Question, LearnLanguage, Level } from '../types';
import { vocab, randomItem, shuffle } from './vocabulary';

let genIdCounter = 1000;
function nextId() {
  return genIdCounter++;
}

function askInLang(lang: LearnLanguage, de: string, fr: string, es: string, en: string, ar: string): string {
  const map: Record<LearnLanguage, string> = { de, fr, es, en, ar };
  return map[lang] || en;
}

function articleQuestion(lang: LearnLanguage, _level: string): Question | null {
  const v = vocab[lang];
  if (v.articles.length < 2 || lang === 'en') return null;
  const noun = randomItem(v.nouns);

  const fakePool = shuffle(v.articles.filter((a) => a !== noun.article));
  const fakes = fakePool.slice(0, Math.min(3, fakePool.length));
  const options = shuffle([noun.article, ...fakes]).slice(0, 4);
  if (options.length < 2 || !options.includes(noun.article)) return null;

  const question = askInLang(
    lang,
    `Was ist der richtige Artikel? ___ ${noun.word}`,
    `Quel est l'article correct? ___ ${noun.word}`,
    `¿Cuál es el artículo correcto? ___ ${noun.word}`,
    `What is the correct article? ___ ${noun.word}`,
    `ما هي أداة التعريف الصحيحة؟ ___ ${noun.word}`
  );
  const explanation = askInLang(
    lang,
    `"${noun.word}" ist ${noun.gender === 'masculine' ? 'maskulin' : noun.gender === 'feminine' ? 'feminin' : 'neutral'}, also ist "${noun.article}" der richtige Artikel.`,
    `"${noun.word}" est ${noun.gender === 'masculine' ? 'masculin' : noun.gender === 'feminine' ? 'féminin' : 'neutre'}, donc l'article correct est "${noun.article}".`,
    `"${noun.word}" es ${noun.gender === 'masculine' ? 'masculino' : noun.gender === 'feminine' ? 'femenino' : 'neutro'}, así que el artículo correcto es "${noun.article}".`,
    `"${noun.word}" is ${noun.gender}, so the correct article is "${noun.article}".`,
    `"${noun.word}" ${noun.gender === 'masculine' ? 'مذكر' : noun.gender === 'feminine' ? 'مؤنث' : 'محايد'}، لذا أداة التعريف الصحيحة هي "${noun.article}".`
  );

  return { id: nextId(), type: 'multiple-choice', question, options, correctAnswer: noun.article, explanation, category: 'Articles' };
}

function conjugationQuestion(lang: LearnLanguage, _level: string): Question | null {
  const v = vocab[lang];
  const verb = randomItem(v.verbs);
  const pronounKeys = Object.keys(verb.conjugations);
  const pronoun = randomItem(pronounKeys);
  const correct = verb.conjugations[pronoun];
  const wrongOptions = shuffle(pronounKeys.filter((k) => k !== pronoun).map((k) => verb.conjugations[k])).slice(0, 3);
  if (wrongOptions.length < 2) return null;
  const options = shuffle([correct, ...wrongOptions]);

  const question = askInLang(
    lang,
    `${pronoun} ___ (${verb.infinitive})`,
    `${pronoun} ___ (${verb.infinitive})`,
    `${pronoun} ___ (${verb.infinitive})`,
    `${pronoun} ___ (${verb.infinitive})`,
    `${pronoun} ___ (${verb.infinitive})`
  );
  const explanation = askInLang(
    lang,
    `"${pronoun}" erfordert "${correct}" (${verb.infinitive}: ${pronoun} ${correct}).`,
    `"${pronoun}" prend "${correct}" (${verb.infinitive}: ${pronoun} ${correct}).`,
    `"${pronoun}" requiere "${correct}" (${verb.infinitive}: ${pronoun} ${correct}).`,
    `"${pronoun}" takes "${correct}" (${verb.infinitive}: ${pronoun} ${correct}).`,
    `"${pronoun}" يأخذ "${correct}" (${verb.infinitive}: ${pronoun} ${correct}).`
  );

  return { id: nextId(), type: 'fill-blank', question, options, correctAnswer: correct, explanation, category: 'Verbs' };
}

function vocabularyQuestion(lang: LearnLanguage, _level: string): Question | null {
  const v = vocab[lang];
  const type = Math.random() > 0.5 ? 'noun' : 'adj';

  if (type === 'noun') {
    const noun = randomItem(v.nouns);
    const wrongs = shuffle(v.nouns.filter((n) => n.word !== noun.word).map((n) => n.translationEn)).slice(0, 3);
    const options = shuffle([noun.translationEn, ...wrongs]);

    const question = askInLang(
      lang,
      `Was bedeutet "${noun.word}"?`,
      `Que signifie "${noun.word}" ?`,
      `¿Qué significa "${noun.word}"?`,
      `What does "${noun.word}" mean?`,
      `ماذا تعني "${noun.word}"؟`
    );
    const explanation = askInLang(
      lang,
      `"${noun.word}" bedeutet "${noun.translationEn}".`,
      `"${noun.word}" signifie "${noun.translationEn}".`,
      `"${noun.word}" significa "${noun.translationEn}".`,
      `"${noun.word}" means "${noun.translationEn}".`,
      `"${noun.word}" تعني "${noun.translationEn}".`
    );

    return { id: nextId(), type: 'multiple-choice', question, options, correctAnswer: noun.translationEn, explanation, category: 'Vocabulary' };
  } else {
    const adj = randomItem(v.adjectives);
    const wrongs = shuffle(v.adjectives.filter((a) => a.word !== adj.word).map((a) => a.translationEn)).slice(0, 3);
    const options = shuffle([adj.translationEn, ...wrongs]);

    const question = askInLang(
      lang,
      `Was bedeutet "${adj.word}"?`,
      `Que signifie "${adj.word}" ?`,
      `¿Qué significa "${adj.word}"?`,
      `What does "${adj.word}" mean?`,
      `ماذا تعني "${adj.word}"؟`
    );
    const explanation = askInLang(
      lang,
      `"${adj.word}" bedeutet "${adj.translationEn}".`,
      `"${adj.word}" signifie "${adj.translationEn}".`,
      `"${adj.word}" significa "${adj.translationEn}".`,
      `"${adj.word}" means "${adj.translationEn}".`,
      `"${adj.word}" تعني "${adj.translationEn}".`
    );

    return { id: nextId(), type: 'multiple-choice', question, options, correctAnswer: adj.translationEn, explanation, category: 'Vocabulary' };
  }
}

function translationQuestion(lang: LearnLanguage, _level: string): Question | null {
  const v = vocab[lang];
  const isNoun = Math.random() > 0.5;
  const word = isNoun ? randomItem(v.nouns) : randomItem(v.adjectives);
  const text = isNoun ? (word as any).word : (word as any).word;
  const translation = isNoun ? (word as any).translationEn : (word as any).translationEn;

  const dir = Math.random() > 0.5 ? 'toTarget' : 'fromTarget';

  if (dir === 'toTarget') {
    const pool = isNoun
      ? shuffle(v.nouns.filter((n) => n.word !== text)).slice(0, 3).map((n) => n.word)
      : shuffle(v.adjectives.filter((a) => a.word !== text)).slice(0, 3).map((a) => a.word);
    const options = shuffle([text, ...pool]);
    return {
      id: nextId(),
      type: 'multiple-choice',
      question: `How do you say "${translation}" in ${lang === 'de' ? 'German' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : lang === 'ar' ? 'Arabic' : 'English'}?`,
      options,
      correctAnswer: text,
      explanation: `"${translation}" in ${lang === 'de' ? 'German' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : lang === 'ar' ? 'Arabic' : 'English'} is "${text}".`,
      category: 'Vocabulary',
    };
  } else {
    const pool = isNoun
      ? shuffle(v.nouns.filter((n) => n.word !== text).map((n) => n.translationEn)).slice(0, 3)
      : shuffle(v.adjectives.filter((a) => a.word !== text).map((a) => a.translationEn)).slice(0, 3);
    const options = shuffle([translation, ...pool]);
    return {
      id: nextId(),
      type: 'multiple-choice',
      question: `What does "${text}" mean?`,
      options,
      correctAnswer: translation,
      explanation: `"${text}" means "${translation}".`,
      category: 'Vocabulary',
    };
  }
}

function sentenceFillQuestion(lang: LearnLanguage, _level: string): Question | null {
  const templates: Record<LearnLanguage, { sentence: string; blank: string; answer: string; explanation: string }[]> = {
    de: [
      { sentence: 'Ich ___ ein Student.', blank: '___', answer: 'bin', explanation: '"Ich" nimmt "bin" (sein).' },
      { sentence: 'Du ___ aus Deutschland.', blank: '___', answer: 'kommst', explanation: '"Du" nimmt "kommst" (kommen).' },
      { sentence: 'Er ___ einen Hund.', blank: '___', answer: 'hat', explanation: '"Er" nimmt "hat" (haben).' },
      { sentence: 'Wir ___ gern Fußball.', blank: '___', answer: 'spielen', explanation: '"Wir" nimmt "spielen".' },
      { sentence: 'Das Wetter ist ___.', blank: '___', answer: 'schön', explanation: '"Schön" bedeutet nice/beautiful.' },
    ],
    fr: [
      { sentence: 'Je ___ français.', blank: '___', answer: 'suis', explanation: '"Je" prend "suis" (être).' },
      { sentence: 'Tu ___ un chat.', blank: '___', answer: 'as', explanation: '"Tu" prend "as" (avoir).' },
      { sentence: 'Nous ___ à Paris.', blank: '___', answer: 'habitons', explanation: '"Nous" prend "habitons" (habiter).' },
    ],
    es: [
      { sentence: 'Yo ___ de España.', blank: '___', answer: 'soy', explanation: '"Yo" requiere "soy" (ser).' },
      { sentence: 'Tú ___ un libro.', blank: '___', answer: 'tienes', explanation: '"Tú" requiere "tienes" (tener).' },
    ],
    en: [
      { sentence: 'I ___ a teacher.', blank: '___', answer: 'am', explanation: '"I" takes "am" (to be).' },
      { sentence: 'She ___ to school.', blank: '___', answer: 'goes', explanation: '"She" takes "goes" (to go).' },
    ],
    ar: [
      { sentence: 'أنا ___ طالب.', blank: '___', answer: 'أنا', explanation: 'ضمير المتكلم "أنا".' },
      { sentence: 'هو ___ في البيت.', blank: '___', answer: 'هو', explanation: 'ضمير الغائب "هو".' },
    ],
  };

  const langTemplates = templates[lang] || templates.en;
  const tpl = randomItem(langTemplates);

  const wrongPool: Record<string, string[]> = {
    de: ['bin', 'bist', 'ist', 'sind', 'habe', 'hast', 'hat', 'haben', 'komme', 'kommst', 'kommt', 'kommen', 'spiele', 'spielst', 'spielt', 'spielen', 'gut', 'schlecht', 'groß', 'klein', 'alt', 'neu'],
    fr: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont', 'ai', 'as', 'a', 'avons', 'avez', 'ont', 'habite', 'habites', 'habite', 'habitons', 'habitez', 'habitent'],
    es: ['soy', 'eres', 'es', 'somos', 'sois', 'son', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
    en: ['am', 'is', 'are', 'was', 'were', 'have', 'has', 'do', 'does', 'go', 'goes', 'went', 'like', 'likes'],
    ar: ['أنا', 'أنت', 'هو', 'هي', 'نحن', 'هم'],
  };

  const pool = (wrongPool[lang] || wrongPool.en).filter((w) => w !== tpl.answer);
  const fakes = shuffle(pool).slice(0, 3);
  const options = shuffle([tpl.answer, ...fakes]);

  return {
    id: nextId(),
    type: 'fill-blank',
    question: tpl.sentence.replace('___', '___'),
    options,
    correctAnswer: tpl.answer,
    explanation: tpl.explanation,
    category: 'Sentence Structure',
  };
}

const generators: Record<string, (lang: LearnLanguage, level: Level) => Question | null> = {
  article: articleQuestion,
  conjugation: conjugationQuestion,
  vocabulary: vocabularyQuestion,
  translation: translationQuestion,
  sentence: sentenceFillQuestion,
};

export function generateQuestions(lang: LearnLanguage, _level: Level, count: number): Question[] {
  const generated: Question[] = [];
  const genKeys = shuffle(Object.keys(generators));

  for (let attempt = 0; attempt < count * 10 && generated.length < count; attempt++) {
    for (const key of genKeys) {
      if (generated.length >= count) break;
      const q = generators[key](lang, _level);
      if (q && !generated.some((g) => g.question === q.question)) {
        generated.push(q);
      }
    }
  }

  return shuffle(generated).slice(0, count);
}

function topicArticleQuestion(word: { word: string; article: string }, lang: LearnLanguage): Question | null {
  if (lang === 'en' || !word.article) return null;
  const articles = word.article === 'das' ? ['Der', 'Die', 'Das'] : word.article === 'die' ? ['Der', 'Die', 'Das'] : ['Der', 'Die', 'Das'];
  const fakes = shuffle(articles.filter((a) => a.toLowerCase() !== word.article)).slice(0, 3);
  const options = shuffle([word.article, ...fakes]);
  return {
    id: nextId(),
    type: 'multiple-choice',
    question: askInLang(
      lang,
      `Was ist der richtige Artikel? ___ ${word.word}`,
      `Quel est l'article correct? ___ ${word.word}`,
      `¿Cuál es el artículo correcto? ___ ${word.word}`,
      `What is the correct article? ___ ${word.word}`,
      `ما هي أداة التعريف الصحيحة؟ ___ ${word.word}`
    ),
    options,
    correctAnswer: word.article,
    explanation: askInLang(
      lang,
      `"${word.word}" ist ${word.article === 'der' ? 'maskulin' : word.article === 'die' ? 'feminin' : 'neutral'}.`,
      `"${word.word}" est ${word.article === 'der' ? 'masculin' : word.article === 'die' ? 'féminin' : 'neutre'}.`,
      `"${word.word}" es ${word.article === 'der' ? 'masculino' : word.article === 'die' ? 'femenino' : 'neutro'}.`,
      `"${word.word}" takes "${word.article}".`,
      `"${word.word}" يأخذ "${word.article}".`
    ),
    category: 'Articles',
  };
}

function topicMeaningQuestion(word: { word: string; article: string; translation: string }, pool: { word: string; translation: string }[], lang: LearnLanguage): Question | null {
  const wrongs = shuffle(pool.filter((w) => w.word !== word.word).map((w) => w.translation)).slice(0, 3);
  const options = shuffle([word.translation, ...wrongs]);
  const question = askInLang(
    lang,
    `Was bedeutet "${word.word}"?`,
    `Que signifie "${word.word}" ?`,
    `¿Qué significa "${word.word}"?`,
    `What does "${word.word}" mean?`,
    `ماذا تعني "${word.word}"؟`
  );
  return {
    id: nextId(),
    type: 'multiple-choice',
    question,
    options,
    correctAnswer: word.translation,
    explanation: `"${word.word}" bedeutet "${word.translation}".`,
    category: 'Vocabulary',
  };
}

function topicPluralQuestion(word: { word: string; article: string; plural: string }, pool: { word: string; article: string; plural: string }[]): Question | null {
  if (!word.plural || word.plural === '-' || word.plural === word.word) return null;
  const pluralWord = word.plural;
  const wrongPool = pool
    .filter((w) => w.word !== word.word && w.plural && w.plural !== '-' && w.plural !== w.word)
    .map((w) => w.plural);
  const wrongs = shuffle(wrongPool).slice(0, 3);
  const options = shuffle([pluralWord, ...wrongs]);
  const question = `Was ist die Pluralform von "${word.word}"?`;
  return {
    id: nextId(),
    type: 'multiple-choice',
    question,
    options,
    correctAnswer: pluralWord,
    explanation: `Der Plural von "${word.word}" ist "${pluralWord}".`,
    category: 'Nouns & Plurals',
  };
}

export function generateTopicQuestions(
  words: { word: string; article: string; plural: string; translation: string }[],
  level: Level,
  count: number,
  lang: LearnLanguage = 'de'
): Question[] {
  const generated: Question[] = [];
  const nounLike = words.filter((w) => w.article);
  const withPlural = nounLike.filter((w) => w.plural && w.plural !== '-');
  const allWithTrans = words.filter((w) => w.translation);

  const attempts = count * 10;
  for (let i = 0; i < attempts && generated.length < count; i++) {
    const pick = Math.random();
    if (pick < 0.4 && nounLike.length > 0) {
      const w = randomItem(nounLike);
      const q = topicArticleQuestion(w, lang);
      if (q && !generated.some((g) => g.question === q.question)) generated.push(q);
    } else if (pick < 0.75 && allWithTrans.length > 0) {
      const w = randomItem(allWithTrans);
      const q = topicMeaningQuestion(w, allWithTrans, lang);
      if (q && !generated.some((g) => g.question === q.question)) generated.push(q);
    } else if (withPlural.length > 0) {
      const w = randomItem(withPlural);
      const q = topicPluralQuestion(w, nounLike);
      if (q && !generated.some((g) => g.question === q.question)) generated.push(q);
    }
  }

  const conjugationPool = generateQuestions(lang, level, Math.ceil(count / 3)).filter((q) => q.category === 'Verbs' || q.category === 'Sentence Structure');
  generated.push(...conjugationPool);

  return shuffle(generated).slice(0, count);
}
