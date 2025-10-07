'use client';

import { useAuthStore } from '@/context/auth-store';
import { useDashboardData } from '@/hooks/useDashboardData';
import { WelcomeSection } from './dashboard-main-components/welcome-section';
import { GenreTags } from './dashboard-main-components/genre-tags';
import { BookSection } from './dashboard-main-components/book-section';
import { GenreSection } from './dashboard-main-components/genre-section';
import { OnboardingPrompt } from './dashboard-main-components/onboardingPrompt';
import { ErrorState } from './dashboard-main-components/error-state';

import { useBooksStore } from '@/context/books-store';
export default function DashboardPage() {
  const { user } = useAuthStore();
  const { searchResults, isSearching, searchQuery } = useBooksStore();
  const {
    personalizedRecommendations,
    genreBooks,
    userGenres,
    isLoading,
    hasError,
    error,
  } = useDashboardData();

  const recommendedBooks = personalizedRecommendations.map(rec => rec.book);
  const showSearchResults = searchResults && searchQuery.trim().length > 0;

  if (hasError) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <WelcomeSection user={user} />
          <ErrorState 
            message={error?.message || 'Failed to load dashboard data'} 
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto mt-20">
        <WelcomeSection user={user} />

        {/* Search Results - Always show at top if available */}
        {showSearchResults && (
          <BookSection
            title={`Search Results for "${searchQuery}"`}
            books={searchResults?.books || []}
            isLoading={isSearching}
            emptyMessage="No books found for your search."
          />
        )}

        {/* Regular content shows below search results */}
        {userGenres.length > 0 && <GenreTags genres={userGenres} />}

        <BookSection
          title="Recommended For You"
          books={recommendedBooks}
          isLoading={isLoading}
          emptyMessage="No recommendations yet. Start exploring books!"
        />

        {userGenres.map((genre) => (
          <GenreSection
            key={genre}
            genre={genre}
            books={genreBooks[genre] || []}
            isLoading={isLoading}
          />
        ))}

        {userGenres.length === 0 && !isLoading && <OnboardingPrompt />}
      </div>
    </div>
  );
}