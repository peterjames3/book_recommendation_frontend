import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { authApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferences?: {
    favoriteGenres: string[];
    preferredAuthors: string[];
    readingGoals?: {
      booksPerMonth?: number;
      favoriteFormats?: ('physical' | 'ebook' | 'audiobook')[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
  }) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updatePreferences: (preferences: any) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.login(credentials);
          
          if (response.success && response.data) {
            const { user, token } = response.data;
            
            // Store token in cookies
            Cookies.set('auth-token', token, { expires: 7 }); // 7 days
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            toast.success('Login successful!');
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.register(userData);
          
          if (response.success && response.data) {
            const { user, token } = response.data;
            
            // Store token in cookies
            Cookies.set('auth-token', token, { expires: 7 }); // 7 days
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            toast.success('Registration successful!');
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      logout: () => {
        // Clear token from cookies
        Cookies.remove('auth-token');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        
        toast.success('Logged out successfully');
        
        // Redirect to home page
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      },

      loadUser: async () => {
        try {
          const token = Cookies.get('auth-token');
          
          if (!token) {
            set({ isAuthenticated: false, user: null, token: null });
            return;
          }
          
          set({ isLoading: true });
          
          const response = await authApi.getProfile();
          
          if (response.success && response.data) {
            set({
              user: response.data,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            // Invalid token, clear it
            Cookies.remove('auth-token');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          // Token is invalid, clear it
          Cookies.remove('auth-token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      updatePreferences: async (preferences) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.updatePreferences(preferences);
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
              error: null,
            });
            
            toast.success('Preferences updated successfully!');
          } else {
            throw new Error(response.message || 'Failed to update preferences');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to update preferences';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize auth state on app load
if (typeof window !== 'undefined') {
  const token = Cookies.get('auth-token');
  if (token) {
    useAuthStore.getState().loadUser();
  }
}