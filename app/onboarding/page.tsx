// app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/auth-store';
import { toast } from 'react-hot-toast';

const GENRES = [
  'Art', 'Biography', 'Business', 'Chick Lit', 'Children', 'Christian',
  'Classics', 'Comic', 'Contemporary', 'Cookbooks', 'Crime', 'Ebooks',
  'Fantasy', 'Fiction', 'Gay and Lesbian', 'Graphic Novels', 'Historical Fiction',
  'History', 'Horror', 'Humor and Comedy', 'Manga', 'Memoir', 'Music',
  'Mystery', 'Nonfiction', 'Paranormal', 'Philosophy', 'Poetry', 'Psychology',
  'Religion', 'Romance', 'Science', 'Science Fiction', 'Self Help', 'Suspense',
  'Spirituality', 'Sports', 'Thriller', 'Travel', 'Young Adult'
];

export default function OnboardingPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { updatePreferences, user } = useAuthStore();
  const router = useRouter();

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = async () => {
    if (selectedGenres.length === 0) {
      toast.error('Please select at least one genre to continue');
      return;
    }

    setLoading(true);
    try {
      await updatePreferences({
        favoriteGenres: selectedGenres,
        preferredAuthors: [],
        readingGoals: {
          booksPerMonth: 2,
          favoriteFormats: ['physical', 'ebook']
        }
      });
      
      toast.success('Preferences saved!');
      router.push('/');
    } catch (error) {
      // Error handling is done in the store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Next, select your favorite genres.
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We use your favorite genres to make better book recommendations and tailor what you see in your Updates feed.
          </p>
        </div>

        {/* Genre Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 max-h-96 overflow-y-auto p-2">
          {GENRES.map((genre) => (
            <label
              key={genre}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedGenres.includes(genre)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="hidden"
              />
              <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                selectedGenres.includes(genre)
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedGenres.includes(genre) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-medium">{genre}</span>
            </label>
          ))}
        </div>

        {/* Selection Info */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {selectedGenres.length === 0 ? (
              <span className="text-red-500 font-medium">
                Select at least one genre to continue
              </span>
            ) : (
              <span className="text-green-600 font-medium">
                {selectedGenres.length} genre{selectedGenres.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </p>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={selectedGenres.length === 0 || loading}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving preferences...
              </div>
            ) : (
              'Continue to LitKenya'
            )}
          </button>
        </div>

        {/* Skip Option (Optional) */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}