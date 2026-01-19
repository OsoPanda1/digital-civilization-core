import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string | null;
  images: string[] | null;
  category: string | null;
  price: number;
  currency: string | null;
  quantity: number | null;
  status: string | null;
  created_at: string;
  seller_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

interface UseMarketplaceOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export function useMarketplace(options: UseMarketplaceOptions = {}) {
  const { 
    category, 
    minPrice, 
    maxPrice, 
    page = 1, 
    pageSize = 12, 
    search,
    sortBy = 'newest' 
  } = options;

  return useQuery({
    queryKey: ['marketplace', category, minPrice, maxPrice, page, pageSize, search, sortBy],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('marketplace_items')
        .select('*', { count: 'exact' })
        .eq('status', 'active')
        .range(from, to);

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (minPrice !== undefined) {
        query = query.gte('price', minPrice);
      }

      if (maxPrice !== undefined) {
        query = query.lte('price', maxPrice);
      }

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      switch (sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        items: data as MarketplaceItem[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
      };
    },
  });
}

export function useMarketplaceItem(id: string) {
  return useQuery({
    queryKey: ['marketplace-item', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          profiles!marketplace_items_seller_id_fkey (
            display_name,
            username,
            avatar_url,
            is_verified
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as MarketplaceItem;
    },
    enabled: !!id,
  });
}
