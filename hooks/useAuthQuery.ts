// hooks/useAuthQuery.ts
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/context/auth-store';

export const useUserProfile = () => {
  const { user, loadUser } = useAuthStore();
  
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: loadUser,
    enabled: !!useAuthStore.getState().token && !user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};