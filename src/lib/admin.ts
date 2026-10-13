import { supabase } from './supabase';

// Only used to show the Admin screen. The real permission check is is_admin() in the database.
const ADMIN_EMAIL = 'oussemabraiek@gmail.com';

export function isAdminEmail(email?: string | null): boolean {
  return !!email && email.toLowerCase() === ADMIN_EMAIL;
}

export interface AdminUser {
  user_id: string;
  user_email: string;
  user_nickname: string | null;
  is_blocked: boolean;
  joined_at: string;
  attempts: number;
  last_played: string | null;
}

export async function amIBlocked(): Promise<boolean> {
  if (!supabase) return false;
  const { data, error } = await supabase.rpc('am_i_blocked');
  if (error) return false;
  return data === true;
}

export async function adminListUsers(): Promise<AdminUser[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('admin_list_users');
  if (error) throw error;
  return (data ?? []) as AdminUser[];
}

export async function adminSetBlocked(userId: string, blocked: boolean): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.rpc('admin_set_blocked', { target: userId, value: blocked });
  if (error) throw error;
}

export async function adminDeleteUser(userId: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.rpc('admin_delete_user', { target: userId });
  if (error) throw error;
}
