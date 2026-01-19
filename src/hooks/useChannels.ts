import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  channel_type: string | null;
  is_public: boolean | null;
  members_count: number | null;
  created_at: string;
  owner_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

interface UseChannelsOptions {
  type?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export function useChannels(options: UseChannelsOptions = {}) {
  const { type, page = 1, pageSize = 10, search } = options;

  return useQuery({
    queryKey: ['channels', type, page, pageSize, search],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('channels')
        .select('*', { count: 'exact' })
        .eq('is_public', true)
        .order('members_count', { ascending: false })
        .range(from, to);

      if (type && type !== 'all') {
        query = query.eq('channel_type', type);
      }

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        channels: data as Channel[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
      };
    },
  });
}

export function useChannel(slug: string) {
  return useQuery({
    queryKey: ['channel', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('channels')
        .select(`
          *,
          profiles!channels_owner_id_fkey (
            display_name,
            username,
            avatar_url,
            is_verified
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Channel;
    },
    enabled: !!slug,
  });
}

export function useJoinChannel() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (channelId: string) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('channel_members')
        .insert({
          channel_id: channelId,
          user_id: user.id,
          role: 'member',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    },
  });
}
