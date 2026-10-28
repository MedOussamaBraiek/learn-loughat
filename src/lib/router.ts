import { useEffect, useState } from 'react';

export const LANDING_PATH = '/';
export const PLATFORM_PATH = '/platform';

export function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  return pathname;
}

export function navigate(to: string, { replace = false }: { replace?: boolean } = {}) {
  if (window.location.pathname === to) return;
  if (replace) {
    window.history.replaceState(null, '', to);
  } else {
    window.history.pushState(null, '', to);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}
