import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Lottery {
  id: string;
  title: string;
  description: string | null;
  ticket_price: number;
  prize_pool: number | null;
  max_tickets: number | null;
  sold_tickets: number | null;
  draw_at: string;
  status: string | null;
  winner_id: string | null;
  created_at: string;
}

export interface LotteryTicket {
  id: string;
  lottery_id: string;
  user_id: string;
  ticket_number: string;
  purchased_at: string;
}

export function useLotteries() {
  return useQuery({
    queryKey: ['lotteries', 'active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lotteries')
        .select('*')
        .in('status', ['active', 'pending'])
        .order('draw_at', { ascending: true });

      if (error) throw error;
      return data as Lottery[];
    },
  });
}

export function useLottery(id: string) {
  return useQuery({
    queryKey: ['lottery', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lotteries')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Lottery;
    },
    enabled: !!id,
  });
}

export function useMyTickets(lotteryId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['lottery-tickets', lotteryId, user?.id],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from('lottery_tickets')
        .select('*')
        .eq('user_id', user.id);

      if (lotteryId) {
        query = query.eq('lottery_id', lotteryId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as LotteryTicket[];
    },
    enabled: !!user,
  });
}

export function useBuyTicket() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ lotteryId, quantity = 1 }: { lotteryId: string; quantity?: number }) => {
      if (!user) throw new Error('Not authenticated');

      const tickets = [];
      for (let i = 0; i < quantity; i++) {
        const ticketNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        tickets.push({
          lottery_id: lotteryId,
          user_id: user.id,
          ticket_number: ticketNumber,
        });
      }

      const { data, error } = await supabase
        .from('lottery_tickets')
        .insert(tickets)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lottery-tickets'] });
      queryClient.invalidateQueries({ queryKey: ['lottery', variables.lotteryId] });
      queryClient.invalidateQueries({ queryKey: ['lotteries'] });
    },
  });
}
