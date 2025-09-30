'use client';
import { useQuery } from '@tanstack/react-query';
import { recommendationsApi } from '@/lib/api';
import { Book } from '@/context/books-store';

export function useRelatedBooks(id: string, enabled = false) {
  return useQuery<Book[], Error>({
    queryKey: ['related-books', id],
    queryFn: async () => {
      const response = await recommendationsApi.getSimilar(id, 4);
      return (response?.data as { similarBooks: Book[] })?.similarBooks || [];
    },
    enabled,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
