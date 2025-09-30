import { create } from 'zustand';
import { booksApi, searchApi, recommendationsApi } from '@/lib/api';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export interface Book {
  id: string;
  openLibraryId?: string;
  title: string;
  authors: string[];
  isbn?: string;
  isbn13?: string;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories: string[];
  imageUrl?: string;
  rating?: number;
  ratingsCount?: number;
  price?: number;
  availability: 'available' | 'out_of_stock' | 'pre_order';
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query?: string;
  genres?: string[];
  authors?: string[];
  minRating?: number;
  maxRating?: number;
  minPrice?: number;
  maxPrice?: number;
  publishedAfter?: string;
  publishedBefore?: string;
  minPages?: number;
  maxPages?: number;
  sortBy?: 'relevance' | 'rating' | 'price' | 'newest' | 'oldest' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  books: Book[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Recommendation {
  book: Book;
  score: number;
  reason: string;
}

interface BooksResponse {
  books: Book[];
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    hasMore: boolean;
  };
}

interface BookResponse {
  book: Book;
}

interface SimilarBooksResponse {
  similarBooks: Book[];
}

interface BooksState {
  // Books data
  books: Book[];
  featuredBooks: Book[];
  newReleases: Book[];
  currentBook: Book | null;
  
  // Search data
  searchResults: SearchResult | null;
  searchQuery: string;
  searchFilters: SearchFilters;
  
  // Recommendations
  personalizedRecommendations: Recommendation[];
  trendingBooks: Book[];
  staffPicks: Book[];
  
  // Metadata
  genres: string[];
  authors: string[];
  
  // Loading states
  isLoading: boolean;
  isSearching: boolean;
  isLoadingRecommendations: boolean;
  
  // Error states
  error: string | null;
  searchError: string | null;
}

interface BooksActions {
  // Books actions
  loadBooks: (params?: Record<string, unknown>) => Promise<void>;
  loadFeaturedBooks: (limit?: number) => Promise<void>;
  loadNewReleases: (limit?: number) => Promise<void>;
  loadBook: (id: string) => Promise<void>;
  loadBooksByGenre: (genre: string, params?: Record<string, unknown>) => Promise<void>;
   
  // Enhanced search actions
  searchEnhanced: (query: string, params?: Record<string, unknown>) => Promise<void>;
    searchExternalBooks: (query: string, params?: Record<string, unknown>) => Promise<void>;
  
  // Search actions
  searchBooks: (query: string, params?: Record<string, unknown>) => Promise<void>;
  advancedSearch: (filters: SearchFilters) => Promise<void>;
  searchExternal: (query: string, params?: Record<string, unknown>) => Promise<void>;
  clearSearch: () => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  
  // Recommendations actions
  loadPersonalizedRecommendations: (limit?: number) => Promise<void>;
  loadSimilarBooks: (bookId: string, limit?: number) => Promise<Book[]>;
  loadTrendingBooks: (params?: Record<string, unknown>) => Promise<void>;
  loadStaffPicks: (limit?: number) => Promise<void>;
  
  // Metadata actions
  loadGenres: () => Promise<void>;
  loadAuthors: () => Promise<void>;
  
  // Utility actions
  clearError: () => void;
  clearSearchError: () => void;
  setLoading: (loading: boolean) => void;
}

type BooksStore = BooksState & BooksActions;

export const useBooksStore = create<BooksStore>()((set) => ({
  // Initial state
  books: [],
  featuredBooks: [],
  newReleases: [],
  currentBook: null,
  searchResults: null,
  searchQuery: '',
  searchFilters: {},
  personalizedRecommendations: [],
  trendingBooks: [],
  staffPicks: [],
  genres: [],
  authors: [],
  isLoading: false,
  isSearching: false,
  isLoadingRecommendations: false,
  error: null,
  searchError: null,

  // Books actions
  loadBooks: async (params = {}) => {
    try {
      set({ isLoading: true, error: null });

      const response = await booksApi.getBooks(params);

      if (response.success && response.data) {
        const data = response.data as BooksResponse;
        set({
          books: data.books,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Failed to load books');
      }
    } catch (error: unknown) {
      const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'Failed to load books';
      set({
        isLoading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },

  loadFeaturedBooks: async (limit = 12) => {
    try {
      const response = await booksApi.getFeaturedBooks(limit);

      if (response.success && response.data) {
        set({
          featuredBooks: response.data as Book[],
          error: null,
        });
      }
    } catch (error: unknown) {
      console.error('Failed to load featured books:', error);
    }
  },

  loadNewReleases: async (limit = 12) => {
    try {
      const response = await booksApi.getNewReleases(limit);

      if (response.success && response.data) {
        set({
          newReleases: response.data as Book[],
          error: null,
        });
      }
    } catch (error: unknown) {
      console.error('Failed to load new releases:', error);
    }
  },

  loadBook: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await booksApi.getBook(id);

      if (response.success && response.data) {
        const data = response.data as BookResponse;
        set({
          currentBook: data.book,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Failed to load book');
      }
    } catch (error: unknown) {
      const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'Failed to load book';
      set({
        isLoading: false,
        error: errorMessage,
        currentBook: null,
      });
      toast.error(errorMessage);
    }
  },

  loadBooksByGenre: async (genre: string, params = {}) => {
    try {
      set({ isLoading: true, error: null });

      const response = await booksApi.getBooksByGenre(genre, params);

      if (response.success && response.data) {
        const data = response.data as BooksResponse;
        set({
          books: data.books,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Failed to load books by genre');
      }
    } catch (error: unknown) {
      const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'Failed to load books by genre';
      set({
        isLoading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },
  
  // get book description
  getBookDescription: async (id: string): Promise<string> => {
  try {
    const response = await booksApi.getBookDescription(id);
    
    if (response.success && response.data) {
      const data = response.data as { description: string };
      return data.description;
    }
    return "No description available";
  } catch (error: unknown) {
    console.error('Failed to fetch book description:', error);
    return "No description available";
  }
},
searchEnhanced: async (query: string, params = {}) => {
  try {
    set({ isSearching: true, searchError: null, searchQuery: query });

    const response = await booksApi.searchEnhanced(query, params);

    if (response.success && response.data) {
      const books = response.data as Book[];
      set({
        searchResults: {
          books: books,
          totalCount: books.length,
          page: 1,
          limit: books.length,
          hasMore: false,
        },
        isSearching: false,
        searchError: null,
      });
    } else {
      throw new Error(response.message || 'Enhanced search failed');
    }
  } catch (error: unknown) {
    const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'Enhanced search failed';
    set({
      isSearching: false,
      searchError: errorMessage,
      searchResults: null,
    });
    toast.error(errorMessage);
  }
},

searchExternalBooks: async (query: string, params = {}) => {
  try {
    set({ isSearching: true, searchError: null });

    const response = await booksApi.searchExternalBooks(query, params);

    if (response.success && response.data) {
      const books = response.data as Book[];
      set({
        searchResults: {
          books: books,
          totalCount: books.length,
          page: 1,
          limit: books.length,
          hasMore: false,
        },
        isSearching: false,
        searchError: null,
      });
    } else {
      throw new Error(response.message || 'External books search failed');
    }
  } catch (error: unknown) {
    const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'External books search failed';
    set({
      isSearching: false,
      searchError: errorMessage,
      searchResults: null,
    });
    toast.error(errorMessage);
  }
},

  // Search actions
  searchBooks: async (query: string, params = {}) => {
    try {
      set({ isSearching: true, searchError: null, searchQuery: query });

      const response = await searchApi.naturalLanguageSearch(query, params);

      if (response.success && response.data) {
        const data = response.data as BooksResponse;
        set({
          searchResults: {
            books: data.books,
            totalCount: data.pagination.totalItems,
            page: data.pagination.currentPage,
            limit: data.pagination.itemsPerPage,
            hasMore: data.pagination.hasMore,
          },
          isSearching: false,
          searchError: null,
        });
      } else {
        throw new Error(response.message || 'Search failed');
      }
    } catch (error: unknown) {
      const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'Search failed';
      set({
        isSearching: false,
        searchError: errorMessage,
        searchResults: null,
      });
      toast.error(errorMessage);
    }
  },

  advancedSearch: async (filters: SearchFilters) => {
    try {
      set({ isSearching: true, searchError: null, searchFilters: filters });

      const response = await searchApi.advancedSearch(filters as Record<string, unknown>);

      if (response.success && response.data) {
        const data = response.data as BooksResponse;
        set({
          searchResults: {
            books: data.books,
            totalCount: data.pagination.totalItems,
            page: data.pagination.currentPage,
            limit: data.pagination.itemsPerPage,
            hasMore: data.pagination.hasMore,
          },
          isSearching: false,
          searchError: null,
        });
      } else {
        throw new Error(response.message || 'Advanced search failed');
      }
    } catch (error: unknown) {
      const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'Advanced search failed';
      set({
        isSearching: false,
        searchError: errorMessage,
        searchResults: null,
      });
      toast.error(errorMessage);
    }
  },

  searchExternal: async (query: string, params = {}) => {
    try {
      set({ isSearching: true, searchError: null });

      const response = await searchApi.searchExternal(query, params);

      if (response.success && response.data) {
        const data = response.data as BooksResponse;
        set({
          searchResults: {
            books: data.books,
            totalCount: data.pagination.totalItems,
            page: data.pagination.currentPage,
            limit: data.pagination.itemsPerPage,
            hasMore: data.pagination.hasMore,
          },
          isSearching: false,
          searchError: null,
        });
      } else {
        throw new Error(response.message || 'External search failed');
      }
    } catch (error: unknown) {
      const errorMessage = ((error as AxiosError).response?.data as ErrorResponse)?.message || (error as AxiosError).message || 'External search failed';
      set({
        isSearching: false,
        searchError: errorMessage,
        searchResults: null,
      });
      toast.error(errorMessage);
    }
  },

  clearSearch: () => {
    set({
      searchResults: null,
      searchQuery: '',
      searchFilters: {},
      searchError: null,
    });
  },

  setSearchFilters: (filters: Partial<SearchFilters>) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    }));
  },

  // Recommendations actions
  loadPersonalizedRecommendations: async (limit = 10) => {
    try {
      set({ isLoadingRecommendations: true });

      const response = await recommendationsApi.getPersonalized(limit);

      if (response.success && response.data) {
        set({
          personalizedRecommendations: response.data as Recommendation[],
          isLoadingRecommendations: false,
        });
      }
    } catch (error: unknown) {
      set({ isLoadingRecommendations: false });
      // Silently fail for recommendations - not critical
      console.error('Failed to load personalized recommendations:', error);
    }
  },

  loadSimilarBooks: async (bookId: string, limit = 5) => {
    try {
      const response = await recommendationsApi.getSimilar(bookId, limit);

      if (response.success && response.data) {
        return (response.data as SimilarBooksResponse).similarBooks;
      }
      return [];
    } catch (error: unknown) {
      console.error('Failed to load similar books:', error);
      return [];
    }
  },

  loadTrendingBooks: async (params = {}) => {
    try {
      const response = await recommendationsApi.getTrending(params);

      if (response.success && response.data) {
        set({
          trendingBooks: (response.data as { books: Book[] }).books,
        });
      }
    } catch (error: unknown) {
      console.error('Failed to load trending books:', error);
    }
  },

  loadStaffPicks: async (limit = 8) => {
    try {
      const response = await recommendationsApi.getStaffPicks(limit);

      if (response.success && response.data) {
        set({
          staffPicks: response.data as Book[],
        });
      }
    } catch (error: unknown) {
      console.error('Failed to load staff picks:', error);
    }
  },

  // Metadata actions
  loadGenres: async () => {
    try {
      const response = await booksApi.getGenres();

      if (response.success && response.data) {
        set({
          genres: response.data as string[],
        });
      }
    } catch (error: unknown) {
      console.error('Failed to load genres:', error);
    }
  },

  loadAuthors: async () => {
    try {
      const response = await booksApi.getAuthors();

      if (response.success && response.data) {
        set({
          authors: response.data as string[],
        });
      }
    } catch (error: unknown) {
      console.error('Failed to load authors:', error);
    }
  },

  // Utility actions
  clearError: () => {
    set({ error: null });
  },

  clearSearchError: () => {
    set({ searchError: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));