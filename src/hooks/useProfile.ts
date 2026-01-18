import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  bio: string | null;
  level: number;
  xp: number;
  tokens: number;
  is_verified: boolean;
  is_creator: boolean;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
}

export function useProfile(userId?: string) {
  const { user } = useAuth();
  const targetId = userId || user?.id;

  return useQuery({
    queryKey: ['profile', targetId],
    queryFn: async () => {
      if (!targetId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', targetId)
        .single();
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!targetId,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
}
