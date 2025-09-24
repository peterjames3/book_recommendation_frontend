import { create } from 'zustand';
import { booksApi, searchApi, recommendationsApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

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
  staffPicks: any[];
  
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
  loadBooks: (params?: any) => Promise<void>;
  loadFeaturedBooks: (limit?: number) => Promise<void>;
  loadNewReleases: (limit?: number) => Promise<void>;
  loadBook: (id: string) => Promise<void>;
  loadBooksByGenre: (genre: string, params?: any) => Promise<void>;
  
  // Search actions
  searchBooks: (query: string, params?: any) => Promise<void>;
  advancedSearch: (filters: SearchFilters) => Promise<void>;
  searchExternal: (query: string, params?: any) => Promise<void>;
  clearSearch: () => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  
  // Recommendations actions
  loadPersonalizedRecommendations: (limit?: number) => Promise<void>;
  loadSimilarBooks: (bookId: string, limit?: number) => Promise<Book[]>;
  loadTrendingBooks: (params?: any) => Promise<void>;
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

export const useBooksStore = create<BooksStore>()((set, get) => ({
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
        set({
          books: response.data.books,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Failed to load books');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load books';
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
          featuredBooks: response.data,
          error: null,
        });
      }
    } catch (error: any) {
      console.error('Failed to load featured books:', error);
    }
  },

  loadNewReleases: async (limit = 12) => {
    try {
      const response = await booksApi.getNewReleases(limit);
      
      if (response.success && response.data) {
        set({
          newReleases: response.data,
          error: null,
        });
      }
    } catch (error: any) {
      console.error('Failed to load new releases:', error);
    }
  },

  loadBook: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await booksApi.getBook(id);
      
      if (response.success && response.data) {
        set({
          currentBook: response.data.book,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Failed to load book');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load book';
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
        set({
          books: response.data.books,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Failed to load books by genre');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load books by genre';
      set({
        isLoading: false,
        error: errorMessage,
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
        set({
          searchResults: {
            books: response.data.books,
            totalCount: response.data.pagination.totalItems,
            page: response.data.pagination.currentPage,
            limit: response.data.pagination.itemsPerPage,
            hasMore: response.data.pagination.hasMore,
          },
          isSearching: false,
          searchError: null,
        });
      } else {
        throw new Error(response.message || 'Search failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Search failed';
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
      
      const response = await searchApi.advancedSearch(filters);
      
      if (response.success && response.data) {
        set({
          searchResults: {
            books: response.data.books,
            totalCount: response.data.pagination.totalItems,
            page: response.data.pagination.currentPage,
            limit: response.data.pagination.itemsPerPage,
            hasMore: response.data.pagination.hasMore,
          },
          isSearching: false,
          searchError: null,
        });
      } else {
        throw new Error(response.message || 'Advanced search failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Advanced search failed';
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
        set({
          searchResults: {
            books: response.data.books,
            totalCount: response.data.pagination.totalItems,
            page: response.data.pagination.currentPage,
            limit: response.data.pagination.itemsPerPage,
            hasMore: response.data.pagination.hasMore,
          },
          isSearching: false,
          searchError: null,
        });
      } else {
        throw new Error(response.message || 'External search failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'External search failed';
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
          personalizedRecommendations: response.data,
          isLoadingRecommendations: false,
        });
      }
    } catch (error: any) {
      set({ isLoadingRecommendations: false });
      // Silently fail for recommendations - not critical
      console.error('Failed to load personalized recommendations:', error);
    }
  },

  loadSimilarBooks: async (bookId: string, limit = 5) => {
    try {
      const response = await recommendationsApi.getSimilar(bookId, limit);
      
      if (response.success && response.data) {
        return response.data.similarBooks;
      }
      return [];
    } catch (error: any) {
      console.error('Failed to load similar books:', error);
      return [];
    }
  },

  loadTrendingBooks: async (params = {}) => {
    try {
      const response = await recommendationsApi.getTrending(params);
      
      if (response.success && response.data) {
        set({
          trendingBooks: response.data.books,
        });
      }
    } catch (error: any) {
      console.error('Failed to load trending books:', error);
    }
  },

  loadStaffPicks: async (limit = 8) => {
    try {
      const response = await recommendationsApi.getStaffPicks(limit);
      
      if (response.success && response.data) {
        set({
          staffPicks: response.data,
        });
      }
    } catch (error: any) {
      console.error('Failed to load staff picks:', error);
    }
  },

  // Metadata actions
  loadGenres: async () => {
    try {
      const response = await booksApi.getGenres();
      
      if (response.success && response.data) {
        set({
          genres: response.data,
        });
      }
    } catch (error: any) {
      console.error('Failed to load genres:', error);
    }
  },

  loadAuthors: async () => {
    try {
      const response = await booksApi.getAuthors();
      
      if (response.success && response.data) {
        set({
          authors: response.data,
        });
      }
    } catch (error: any) {
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