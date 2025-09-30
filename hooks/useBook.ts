'use client';
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@/lib/api';
import { Book } from '@/context/books-store';

export function useBook(id: string) {
  return useQuery<Book, Error>({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await booksApi.getBook(id);
      return (response?.data as { book: Book })?.book;
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 2,
  });
}

export function useBookDescription(id: string, enabled = false) {
  return useQuery({
    queryKey: ['book-description', id],
    queryFn: async () => {
      const response = await booksApi.getBookDescription(id);
      return (response?.data as { description: string })?.description || "No description available";
    },
    enabled,
  });
}
