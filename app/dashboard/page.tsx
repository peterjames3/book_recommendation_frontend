// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/context/auth-store';
import { useBooksStore, Book } from '@/context/books-store';
import Link from 'next/link';
import Image from 'next/image'

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { 
    loadPersonalizedRecommendations, 
    loadBooksByGenre, 
    personalizedRecommendations,
    books,
    isLoading 
  } = useBooksStore();
  
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [genreBooks, setGenreBooks] = useState<Record<string, Book[]>>({});

  useEffect(() => {
    if (user?.preferences?.favoriteGenres) {
      // Load personalized recommendations
      loadPersonalizedRecommendations();
      
      // Load books for each favorite genre
      user.preferences.favoriteGenres.forEach(genre => {
        loadBooksByGenre(genre, { limit: 6 }).then(() => {
          // This will update the books store, but we need to filter by genre
          const genreBooks = books.filter(book => 
            book.categories?.includes(genre)
          );
          setGenreBooks(prev => ({
            ...prev,
            [genre]: genreBooks
          }));
        });
      });
    }
  }, [user?.preferences?.favoriteGenres, loadPersonalizedRecommendations, loadBooksByGenre, books]);

  // Get user's favorite genres
  const favoriteGenres = user?.preferences?.favoriteGenres || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-normalText text-lg">
            Continue your reading journey with personalized recommendations.
          </p>
        </section>

        {/* Selected Genres Section */}
        {favoriteGenres.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-text">Your Favorite Genres</h2>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Personalized Recommendations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text mb-4">
            Recommended For You
          </h2>
          {personalizedRecommendations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {personalizedRecommendations.slice(0, 6).map((rec) => (
                <BookCard key={rec.book.id} book={rec.book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-normalText">
                {isLoading ? 'Loading recommendations...' : 'No recommendations yet. Start exploring books!'}
              </p>
            </div>
          )}
        </section>

        {/* Books by Favorite Genres */}
        {favoriteGenres.map((genre) => (
          <section key={genre} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-text">{genre} Books</h2>
              <Link 
                href={`/books?genre=${encodeURIComponent(genre)}`}
                className="text-primary hover:text-button-hover font-medium"
              >
                See all
              </Link>
            </div>
            {genreBooks[genre] && genreBooks[genre].length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {genreBooks[genre].slice(0, 6).map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-normalText">
                  {isLoading ? `Loading ${genre} books...` : `No ${genre} books found.`}
                </p>
              </div>
            )}
          </section>
        ))}

        {/* If no genres selected, show general books */}
        {favoriteGenres.length === 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-4">
              Popular Books
            </h2>
            <div className="text-center py-8">
              <p className="text-normalText mb-4">
                Complete your onboarding to get personalized book recommendations!
              </p>
              <Link
                href="/onboarding"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover transition-colors"
              >
                Complete Onboarding
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Book Card Component
interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link href={`/books/${book.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="aspect-[3/4] bg-gray-200 rounded mb-3 overflow-hidden">
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={700}
              height={900}

              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-text line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-normalText text-sm mb-2">
          {book.authors?.join(', ')}
        </p>
        {book.rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-normalText">
              {book.rating} ({book.ratingsCount || 0})
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};