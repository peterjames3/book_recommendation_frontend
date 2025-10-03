import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { authApi, User } from '@/lib/api';

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
  updatePreferences: (preferences: Record<string, unknown>) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  // ADDED: Profile update actions
  updateProfile: (profileData: { firstName?: string; lastName?: string; email?: string }) => Promise<void>;
  updateName: (firstName: string, lastName: string) => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

// Create a separate toast utility to avoid hook usage in store
const toastUtil = {
  success: (message: string) => {
    if (typeof window !== 'undefined') {
      import('react-toastify').then(({ toast }) => {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  },
  
  error: (message: string) => {
    if (typeof window !== 'undefined') {
      import('react-toastify').then(({ toast }) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  }
};

export const useAuthStore = create<AuthStore>()(
  
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      
      // Actions
      // login: async (credentials) => {
      //   try {
      //     set({ isLoading: true, error: null });
          
      //     const response = await authApi.login(credentials);
          
      //     if (response.success && response.data) {
      //       const { user, token } = response.data;
            
      //       // Store token in cookies
      //       Cookies.set('auth-token', token, { expires: 7 }); // 7 days
            
      //       set({
      //         user,
      //         token,
      //         isAuthenticated: true,
      //         isLoading: false,
      //         error: null,
      //       });
            
      //       toast.success('Login successful!');
      //     } else {
      //       throw new Error(response.message || 'Login failed');
      //     }
      //   } catch (error: unknown) {
      //     const axiosError = error as AxiosError;
      //     const errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message || 'Login failed';
      //     set({
      //       user: null,
      //       token: null,
      //       isAuthenticated: false,
      //       isLoading: false,
      //       error: errorMessage,
      //     });
      //     toast.error(errorMessage);
      //     throw error;
      //   }
      // },
      // In your auth-store.ts - enhanced login function
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
      
      toastUtil.success('Login successful! Welcome back!');
    } else {
      throw new Error(response.message || 'Login failed');
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    let errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message || 'Login failed';
    
    // Normalize error messages for common cases
    if (errorMessage.toLowerCase().includes('invalid credentials') || 
        errorMessage.toLowerCase().includes('wrong password') ||
        errorMessage.toLowerCase().includes('user not found')) {
      errorMessage = 'Invalid email or password. Please try again.';
    } else if (errorMessage.toLowerCase().includes('network') || 
               errorMessage.toLowerCase().includes('connection')) {
      errorMessage = 'Network error. Please check your connection.';
    }
    
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: errorMessage,
    });
    
    toastUtil.error(errorMessage);
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
            
            toastUtil.success('Registration successful!');
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message || 'Registration failed';
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          toastUtil.error(errorMessage);
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
        
        toastUtil.success('Logged out successfully');
        
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
        } catch (error: unknown) {
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
            
            toastUtil.success('Preferences updated successfully!');
          } else {
            throw new Error(response.message || 'Failed to update preferences');
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message || 'Failed to update preferences';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toastUtil.error(errorMessage);
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // ADDED: Profile update methods
      updateProfile: async (profileData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.updateProfile(profileData);
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
              error: null,
            });
            
            toastUtil.success('Profile updated successfully!');
          } else {
            throw new Error(response.message || 'Failed to update profile');
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message || 'Failed to update profile';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toastUtil.error(errorMessage);
          throw error;
        }
      },

      updateName: async (firstName: string, lastName: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await authApi.updateProfile({ firstName, lastName });

          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
              error: null,
            });

            toastUtil.success('Name updated successfully!');
          } else {
            throw new Error(response.message || 'Failed to update name');
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message || 'Failed to update name';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toastUtil.error(errorMessage);
          throw error;
        }
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