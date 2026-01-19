import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useHasLiked(targetType: string, targetId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['hasLiked', targetType, targetId, user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!user,
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ targetType, targetId }: { targetType: string; targetId: string }) => {
      if (!user) throw new Error('Not authenticated');

      // Check if already liked
      const { data: existing } = await supabase
        .from('likes')
        .select('id')
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;

        // Update likes count on target table
        const targetTable = targetType === 'post' ? 'posts' : 'artworks';
        await supabase.rpc('decrement_likes', { table_name: targetTable, row_id: targetId });

        return { action: 'unliked' };
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            target_type: targetType,
            target_id: targetId,
            user_id: user.id,
          });

        if (error) throw error;

        // Update likes count on target table
        const targetTable = targetType === 'post' ? 'posts' : 'artworks';
        await supabase.rpc('increment_likes', { table_name: targetTable, row_id: targetId });

        return { action: 'liked' };
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hasLiked', variables.targetType, variables.targetId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    },
  });
}

export function useLikesCount(targetType: string, targetId: string) {
  return useQuery({
    queryKey: ['likesCount', targetType, targetId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('target_type', targetType)
        .eq('target_id', targetId);

      if (error) throw error;
      return count || 0;
    },
  });
}
