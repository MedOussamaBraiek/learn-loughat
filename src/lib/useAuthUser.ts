import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { amIBlocked } from './admin';

interface AuthState {
  ready: boolean;
  user: User | null;
  blocked: boolean;
}

// Tracks the signed-in user. Without Supabase configured there is no sign-in, so it is always "ready".
export function useAuthUser(): AuthState {
  const [state, setState] = useState<AuthState>({ ready: !supabase, user: null, blocked: false });

  const apply = (user: User | null) => {
    if (!user) {
      setState({ ready: true, user: null, blocked: false });
      return;
    }
    // Show the user right away; the block check must never hold up the session.
    setState({ ready: true, user, blocked: false });
    amIBlocked().then((blocked) => {
      setState((prev) => (prev.user?.id === user.id ? { ...prev, blocked } : prev));
    });
  };

  useEffect(() => {
    if (!supabase) return;
    supabase.auth
      .getSession()
      .then(({ data }) => apply(data.session?.user ?? null))
      .catch(() => apply(null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => apply(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  return state;
}
