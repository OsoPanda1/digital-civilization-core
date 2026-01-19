import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string | null;
  price: number | null;
  is_for_sale: boolean | null;
  is_nft: boolean | null;
  likes_count: number | null;
  views_count: number | null;
  created_at: string;
  creator_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

interface UseArtworksOptions {
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  isNft?: boolean;
  isForSale?: boolean;
}

export function useArtworks(options: UseArtworksOptions = {}) {
  const { category, page = 1, pageSize = 12, search, isNft, isForSale } = options;

  return useQuery({
    queryKey: ['artworks', category, page, pageSize, search, isNft, isForSale],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('artworks')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (category && category !== 'all') {
        query = query.eq('media_type', category);
      }

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      if (isNft !== undefined) {
        query = query.eq('is_nft', isNft);
      }

      if (isForSale !== undefined) {
        query = query.eq('is_for_sale', isForSale);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        artworks: (data || []) as unknown as Artwork[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
      };
    },
  });
}

export function useArtwork(id: string) {
  return useQuery({
    queryKey: ['artwork', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          profiles!artworks_creator_id_fkey (
            display_name,
            username,
            avatar_url,
            is_verified
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Artwork;
    },
    enabled: !!id,
  });
}
