import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  name: string | null;
  avatarUrl: string | null;
}

// Google puts the photo in avatar_url (and sometimes picture); fall back to the email handle.
export function userProfile(user: User | null | undefined): UserProfile {
  if (!user) return { name: null, avatarUrl: null };
  const meta = user.user_metadata ?? {};
  const fullName = typeof meta.full_name === 'string' ? meta.full_name : '';
  const name = fullName || (typeof meta.name === 'string' ? meta.name : '') || user.email?.split('@')[0] || null;
  const avatarUrl = (typeof meta.avatar_url === 'string' && meta.avatar_url) || (typeof meta.picture === 'string' && meta.picture) || null;
  return { name, avatarUrl };
}
