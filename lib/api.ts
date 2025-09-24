import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      Cookies.remove('auth-token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      toast.error('Access forbidden');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<ApiResponse>('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData: { 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
  }) => {
    const response = await api.post<ApiResponse>('/auth/register', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get<ApiResponse>('/auth/me');
    return response.data;
  },
  
  updatePreferences: async (preferences: any) => {
    const response = await api.put<ApiResponse>('/auth/preferences', preferences);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post<ApiResponse>('/auth/logout');
    return response.data;
  },
};

// Books API
export const booksApi = {
  getBooks: async (params?: {
    page?: number;
    limit?: number;
    genre?: string;
    author?: string;
    minRating?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
  }) => {
    const response = await api.get<ApiResponse>('/books', { params });
    return response.data;
  },
  
  getBook: async (id: string) => {
    const response = await api.get<ApiResponse>(`/books/${id}`);
    return response.data;
  },
  
  getFeaturedBooks: async (limit?: number) => {
    const response = await api.get<ApiResponse>('/books/featured/popular', {
      params: { limit },
    });
    return response.data;
  },
  
  getNewReleases: async (limit?: number) => {
    const response = await api.get<ApiResponse>('/books/featured/new-releases', {
      params: { limit },
    });
    return response.data;
  },
  
  getBooksByGenre: async (genre: string, params?: { limit?: number; page?: number }) => {
    const response = await api.get<ApiResponse>(`/books/genre/${genre}`, { params });
    return response.data;
  },
  
  getGenres: async () => {
    const response = await api.get<ApiResponse>('/books/meta/genres');
    return response.data;
  },
  
  getAuthors: async () => {
    const response = await api.get<ApiResponse>('/books/meta/authors');
    return response.data;
  },
};

// Search API
export const searchApi = {
  naturalLanguageSearch: async (query: string, params?: { limit?: number; page?: number }) => {
    const response = await api.post<ApiResponse>('/search/natural', {
      query,
      ...params,
    });
    return response.data;
  },
  
  advancedSearch: async (filters: any) => {
    const response = await api.post<ApiResponse>('/search/advanced', filters);
    return response.data;
  },
  
  getSuggestions: async (query: string, type?: string) => {
    const response = await api.get<ApiResponse>('/search/suggestions', {
      params: { q: query, type },
    });
    return response.data;
  },
  
  searchExternal: async (query: string, params?: { limit?: number; offset?: number }) => {
    const response = await api.post<ApiResponse>('/search/external', {
      query,
      ...params,
    });
    return response.data;
  },
};

// Recommendations API
export const recommendationsApi = {
  getPersonalized: async (limit?: number) => {
    const response = await api.get<ApiResponse>('/recommendations/personalized', {
      params: { limit },
    });
    return response.data;
  },
  
  getSimilar: async (bookId: string, limit?: number) => {
    const response = await api.get<ApiResponse>(`/recommendations/similar/${bookId}`, {
      params: { limit },
    });
    return response.data;
  },
  
  getByGenre: async (genre: string, params?: { limit?: number; excludeBookIds?: string[] }) => {
    const response = await api.get<ApiResponse>(`/recommendations/by-genre/${genre}`, {
      params,
    });
    return response.data;
  },
  
  getTrending: async (params?: { limit?: number; timeframe?: string }) => {
    const response = await api.get<ApiResponse>('/recommendations/trending', { params });
    return response.data;
  },
  
  getForNewUsers: async (limit?: number) => {
    const response = await api.get<ApiResponse>('/recommendations/for-new-users', {
      params: { limit },
    });
    return response.data;
  },
  
  getStaffPicks: async (limit?: number) => {
    const response = await api.get<ApiResponse>('/recommendations/staff-picks', {
      params: { limit },
    });
    return response.data;
  },
};

// Cart API
export const cartApi = {
  getCart: async () => {
    const response = await api.get<ApiResponse>('/cart');
    return response.data;
  },
  
  addToCart: async (bookId: string, quantity: number = 1) => {
    const response = await api.post<ApiResponse>('/cart/add', { bookId, quantity });
    return response.data;
  },
  
  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await api.put<ApiResponse>(`/cart/update/${itemId}`, { quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId: string) => {
    const response = await api.delete<ApiResponse>(`/cart/remove/${itemId}`);
    return response.data;
  },
  
  clearCart: async () => {
    const response = await api.delete<ApiResponse>('/cart/clear');
    return response.data;
  },
  
  getCartCount: async () => {
    const response = await api.get<ApiResponse>('/cart/count');
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  createOrder: async (orderData: {
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
    notes?: string;
  }) => {
    const response = await api.post<ApiResponse>('/orders/create', orderData);
    return response.data;
  },
  
  getOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await api.get<ApiResponse>('/orders', { params });
    return response.data;
  },
  
  getOrder: async (orderId: string) => {
    const response = await api.get<ApiResponse>(`/orders/${orderId}`);
    return response.data;
  },
  
  cancelOrder: async (orderId: string) => {
    const response = await api.put<ApiResponse>(`/orders/${orderId}/cancel`);
    return response.data;
  },
  
  getOrderStats: async () => {
    const response = await api.get<ApiResponse>('/orders/stats/summary');
    return response.data;
  },
  
  reorder: async (orderId: string, orderData: any) => {
    const response = await api.post<ApiResponse>(`/orders/${orderId}/reorder`, orderData);
    return response.data;
  },
};

export default api;