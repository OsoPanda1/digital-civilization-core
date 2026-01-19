import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Stream {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  status: string | null;
  stream_type: string | null;
  viewers_count: number | null;
  max_viewers: number | null;
  scheduled_at: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

interface UseStreamsOptions {
  status?: string;
  streamType?: string;
  page?: number;
  pageSize?: number;
}

export function useStreams(options: UseStreamsOptions = {}) {
  const { status = 'live', page = 1, pageSize = 12 } = options;

  return useQuery({
    queryKey: ['streams', status, page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('streams')
        .select('*', { count: 'exact' })
        .order('viewers_count', { ascending: false })
        .range(from, to);

      if (status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        streams: data as Stream[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
      };
    },
  });
}

export function useCreateStream() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (stream: { 
      title: string; 
      description?: string;
      stream_type?: string;
      scheduled_at?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('streams')
        .insert({
          ...stream,
          user_id: user.id,
          status: stream.scheduled_at ? 'scheduled' : 'live',
          started_at: stream.scheduled_at ? null : new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streams'] });
    },
  });
}
