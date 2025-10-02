// app/dashboard/hooks/useDashboardData.ts
import { useQuery, useQueries } from '@tanstack/react-query';
import { useAuthStore } from '@/context/auth-store';
import { recommendationsApi, booksApi } from '@/lib/api';
import { Book, Recommendation } from '@/context/books-store';

export const usePersonalizedRecommendations = (limit: number = 6) => {
  return useQuery({
    queryKey: ['personalized-recommendations', limit],
    queryFn: async (): Promise<Recommendation[]> => {
      const response = await recommendationsApi.getPersonalized(limit);
      if (response.success && response.data) {
        return response.data as Recommendation[];
      }
      throw new Error(response.message || 'Failed to fetch recommendations');
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: true, // Always enabled since it's personalized
    gcTime: 1000 * 60 * 60 * 60
  });
};

export const useBooksByGenre = (genre: string, limit: number = 6) => {
  return useQuery({
    queryKey: ['books-by-genre', genre, limit],
    queryFn: async (): Promise<Book[]> => {
      const response = await booksApi.getBooksByGenre(genre, { limit });
      if (response.success && response.data) {
        const data = response.data as { books: Book[] };
        return data.books;
      }
      throw new Error(response.message || `Failed to fetch ${genre} books`);
    },
    staleTime: 1000 * 60 * 40, // 40 minutes
    retry: 2,
  });
};

export const useMultipleGenreBooks = (genres: string[], limitPerGenre: number = 6) => {
  const queries = useQueries({
    queries: genres.map(genre => ({
      queryKey: ['books-by-genre', genre, limitPerGenre],
      queryFn: async (): Promise<{ genre: string; books: Book[] }> => {
        const response = await booksApi.getBooksByGenre(genre, { limit: limitPerGenre });
        if (response.success && response.data) {
          const data = response.data as { books: Book[] };
          return { genre, books: data.books };
        }
        throw new Error(response.message || `Failed to fetch ${genre} books`);
      },
      staleTime: 1000 * 60 * 20, // 10 minutes
      retry: 2,
    }))
  });

  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const error = queries.find(query => query.error)?.error;

  const genreBooks: Record<string, Book[]> = {};
  queries.forEach((query, index) => {
    if (query.data) {
      genreBooks[genres[index]] = query.data.books;
    }
  });

  return {
    genreBooks,
    isLoading,
    isError,
    error,
  };
};

export const useDashboardData = () => {
  const { user } = useAuthStore();
  const favoriteGenres = user?.preferences?.favoriteGenres || [];

  const {
    data: recommendations = [],
    isLoading: isLoadingRecommendations,
    error: recommendationsError,
  } = usePersonalizedRecommendations(6);

  const {
    genreBooks,
    isLoading: isLoadingGenreBooks,
    isError: genreBooksError,
    error: genreError,
  } = useMultipleGenreBooks(favoriteGenres, 6);

  const isLoading = isLoadingRecommendations || isLoadingGenreBooks;
  const hasError = recommendationsError || genreBooksError;

  return {
    personalizedRecommendations: recommendations,
    genreBooks,
    userGenres: favoriteGenres,
    isLoading,
    hasError,
    error: recommendationsError || genreError,
  };
};