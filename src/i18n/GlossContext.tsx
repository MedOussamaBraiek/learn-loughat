import { createContext, useContext, useState, type ReactNode } from 'react';

// Which translation the vocabulary games show: one language at a time, chosen at the top of the page
export type Gloss = 'en' | 'ar';

interface GlossValue {
  gloss: Gloss;
  setGloss: (g: Gloss) => void;
}

const GlossContext = createContext<GlossValue>({ gloss: 'en', setGloss: () => {} });

export function GlossProvider({ children }: { children: ReactNode }) {
  const [gloss, setGloss] = useState<Gloss>('en');
  return <GlossContext.Provider value={{ gloss, setGloss }}>{children}</GlossContext.Provider>;
}

export function useGloss() {
  return useContext(GlossContext);
}
