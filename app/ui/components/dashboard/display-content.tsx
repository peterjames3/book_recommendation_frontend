// app/dashboard/page.tsx
'use client';

import { useAuthStore } from '@/context/auth-store';
import { useDashboardData } from '@/hooks/useDashboardData';
import { WelcomeSection } from './dashboard-main-components/welcome-section';
import { GenreTags } from './dashboard-main-components/genre-tags';
import { BookSection } from './dashboard-main-components/book-section';
import { GenreSection } from './dashboard-main-components/genre-section';
import { OnboardingPrompt } from './dashboard-main-components/onboardingPrompt';
import { ErrorState } from './dashboard-main-components/error-state';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const {
    personalizedRecommendations,
    genreBooks,
    userGenres,
    isLoading,
    hasError,
    error,
  } = useDashboardData();

  // Extract books from recommendations
  const recommendedBooks = personalizedRecommendations.map(rec => rec.book);

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

        {/* Display user's favorite genres */}
        {userGenres.length > 0 && <GenreTags genres={userGenres} />}

        {/* Personalized Recommendations */}
        <BookSection
          title="Recommended For You"
          books={recommendedBooks}
          isLoading={isLoading}
          emptyMessage="No recommendations yet. Start exploring books!"
        />

        {/* Books by Favorite Genres */}
        {userGenres.map((genre) => (
          <GenreSection
            key={genre}
            genre={genre}
            books={genreBooks[genre] || []}
            isLoading={isLoading}
          />
        ))}

        {/* Onboarding Prompt for new users */}
        {userGenres.length === 0 && !isLoading && <OnboardingPrompt />}
      </div>
    </div>
  );
}