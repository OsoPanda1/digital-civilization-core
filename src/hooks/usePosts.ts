import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Post {
  id: string;
  user_id: string;
  content: string | null;
  media_urls: string[] | null;
  media_type: 'image' | 'video' | 'audio' | 'mixed' | null;
  visibility: 'public' | 'followers' | 'private';
  likes_count: number;
  comments_count: number;
  shares_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    is_verified: boolean;
  };
}

const PAGE_SIZE = 20;

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('visibility', 'public')
        .order('created_at', { ascending: false })
        .range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);
      if (error) throw error;
      return data as unknown as Post[];
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === PAGE_SIZE ? pages.length : undefined;
    },
    initialPageParam: 0,
  });
}

export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
    enabled: !!userId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (post: { content?: string; media_urls?: string[]; media_type?: string; visibility?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('posts')
        .insert({ ...post, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
