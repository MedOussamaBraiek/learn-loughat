const CALLBACK_KEYS = [
  'access_token',
  'refresh_token',
  'expires_in',
  'expires_at',
  'token_type',
  'type',
  'provider_token',
  'provider_refresh_token',
  'code',
  'error',
  'error_description',
  'error_code',
  'state',
];

// Supabase can return the OAuth result in the query string (PKCE) or the hash (implicit).
export function authCallbackParams(): URLSearchParams {
  const params = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  hash.forEach((value, key) => {
    if (!params.has(key)) params.set(key, value);
  });
  return params;
}

export function hasAuthCallback(): boolean {
  const params = authCallbackParams();
  return params.has('access_token') || params.has('code') || params.has('error') || params.has('error_description');
}

export function authCallbackErrorMessage(): string | null {
  const params = authCallbackParams();
  const message = params.get('error_description');
  if (message) return message;
  return params.get('error') ? 'Google sign-in did not finish. Please try again.' : null;
}

// Runs after Supabase has read the URL so a failed attempt cannot replay on refresh.
export function clearAuthCallback(): void {
  if (!hasAuthCallback()) return;
  const url = new URL(window.location.href);
  CALLBACK_KEYS.forEach((key) => url.searchParams.delete(key));
  const hash = new URLSearchParams(url.hash.replace(/^#/, ''));
  CALLBACK_KEYS.forEach((key) => hash.delete(key));
  const nextHash = hash.toString();
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${nextHash ? `#${nextHash}` : ''}`);
}
