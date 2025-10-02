// app/ui/components/dashboard/sidenav/types.ts
import { User } from '@/lib/api';

export type SideNavProps = Record<string, never>;

export interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  isLoading: boolean;
  onSearch: (e: React.FormEvent) => void;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
}

export interface UserGenresSectionProps {
  favoriteGenres: string[];
}

export interface DiscoverySectionProps {
  discoveryGenres?: string[];
}

export interface UserProfileSectionProps {
  user: User | null;

  onLogout: () => void;
}