import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { amIBlocked } from './admin';
import { authCallbackErrorMessage, authCallbackParams, clearAuthCallback, hasAuthCallback } from './authCallback';

interface AuthState {
  ready: boolean;
  user: User | null;
  blocked: boolean;
  error: string | null;
}

const CALLBACK_FAILED = 'We couldn’t finish signing you in with Google. Please try again.';

// A failed OAuth return is swallowed by Supabase's initialization, so retry the
// tokens/code from the URL once and turn a second failure into a visible message.
async function recoverSessionFromUrl(): Promise<User | null> {
  if (!supabase) return null;
  const params = authCallbackParams();
  if (params.get('error') || params.get('error_description')) return null;

  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    if (!error && data.session?.user) return data.session.user;
  }

  const code = params.get('code');
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.session?.user) return data.session.user;
  }

  return null;
}

// Tracks the signed-in user. Without Supabase configured there is no sign-in, so it is always "ready".
export function useAuthUser(): AuthState {
  const [state, setState] = useState<AuthState>({ ready: !supabase, user: null, blocked: false, error: null });

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    const hadCallback = hasAuthCallback();

    const apply = (user: User | null) => {
      if (cancelled) return;
      if (user) clearAuthCallback();
      setState((prev) => {
        const blocked = user && prev.user?.id === user.id ? prev.blocked : false;
        return { ready: true, user, blocked, error: user ? null : prev.error };
      });
      if (!user) return;
      // Show the user right away; the block check must never hold up the session.
      amIBlocked().then((blocked) => {
        setState((prev) => (prev.user?.id === user.id ? { ...prev, blocked } : prev));
      });
    };

    const failCallback = () => {
      if (cancelled) return;
      setState({ ready: true, user: null, blocked: false, error: authCallbackErrorMessage() ?? CALLBACK_FAILED });
      clearAuthCallback();
    };

    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (cancelled) return;
        const sessionUser = data.session?.user ?? null;
        if (sessionUser) {
          apply(sessionUser);
          return;
        }
        if (!hadCallback) {
          apply(null);
          return;
        }
        const recovered = await recoverSessionFromUrl().catch(() => null);
        if (cancelled) return;
        if (recovered) apply(recovered);
        else failCallback();
      })
      .catch(() => {
        if (hadCallback) failCallback();
        else apply(null);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session?.user ?? null);
    });
    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  return state;
}
