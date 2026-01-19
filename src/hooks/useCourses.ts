import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  category: string | null;
  level: string | null;
  price: number | null;
  is_free: boolean | null;
  duration_hours: number | null;
  lessons_count: number | null;
  students_count: number | null;
  rating: number | null;
  created_at: string;
  instructor_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

interface UseCoursesOptions {
  category?: string;
  level?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export function useCourses(options: UseCoursesOptions = {}) {
  const { category, level, page = 1, pageSize = 8, search } = options;

  return useQuery({
    queryKey: ['courses', category, level, page, pageSize, search],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('courses')
        .select('*', { count: 'exact' })
        .order('students_count', { ascending: false })
        .range(from, to);

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (level && level !== 'all') {
        query = query.eq('level', level);
      }

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        courses: data as Course[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
      };
    },
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles!courses_instructor_id_fkey (
            display_name,
            username,
            avatar_url,
            is_verified
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Course;
    },
    enabled: !!id,
  });
}
