import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Concert {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  scheduled_at: string;
  status: string | null;
  venue_type: string | null;
  ticket_price: number | null;
  max_capacity: number | null;
  attendees_count: number | null;
  duration_minutes: number | null;
  created_at: string;
  creator_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

interface UseConcertsOptions {
  status?: string;
  page?: number;
  pageSize?: number;
}

export function useConcerts(options: UseConcertsOptions = {}) {
  const { status, page = 1, pageSize = 12 } = options;

  return useQuery({
    queryKey: ['concerts', status, page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('concerts')
        .select('*', { count: 'exact' })
        .order('scheduled_at', { ascending: true })
        .range(from, to);

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        concerts: data as Concert[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
      };
    },
  });
}

export function useUpcomingConcerts(limit = 5) {
  return useQuery({
    queryKey: ['concerts', 'upcoming', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('concerts')
        .select(`
          *,
          profiles!concerts_creator_id_fkey (
            display_name,
            username,
            avatar_url,
            is_verified
          )
        `)
        .gte('scheduled_at', new Date().toISOString())
        .eq('status', 'scheduled')
        .order('scheduled_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as Concert[];
    },
  });
}
