"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { recommendationsApi } from "@/lib/api";
import { Book } from "@/context/books-store";
import { toast } from "react-hot-toast";
import GenreButton from "./genre-button";
import GenreBookGrid from "./genre-book-grid";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Thriller",
  "Biography",
  "History",
];

export default function GenreFilter() {
  const [selectedGenre, setSelectedGenre] = useState<string>("Fiction");

  const {
    data: apiResponse,
    isLoading,
    
    isError,
  } = useQuery({
    queryKey: ['books-by-genre', selectedGenre],
    queryFn: () => recommendationsApi.getByGenre(selectedGenre, { limit: 10 }),
    staleTime: Infinity, // Prevents unnecessary refetches
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
  });

  // Extract books from API response
  const books = apiResponse?.success ? (apiResponse.data?.books as Book[]) : [];

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    // React Query will automatically fetch due to queryKey change
  };

  // Show error toast if query fails
  if (isError) {
    toast.error("Failed to fetch books by genre");
  }

  // Show no books message if API returns empty
  if (!isLoading && books.length === 0 && !isError) {
    toast.error("No books found for this genre");
  }

  return (
    <section className="mt-12 w-full bg-accent2">
      <div className="py-12 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]">
        <h2 className="headline font-semibold mb-4">Browse by Genre</h2>

        {/* Genre buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {GENRES.map((genre) => (
            <GenreButton
              key={genre}
              genre={genre}
              isSelected={selectedGenre === genre}
              loading={isLoading && selectedGenre === genre}
              onClick={() => handleGenreClick(genre)}
            />
          ))}
        </div>

        {/* Book grid */}
        {selectedGenre && (
          <GenreBookGrid 
            genre={selectedGenre} 
            books={books} 
            loading={isLoading} 
          />
        )}
      </div>
    </section>
  );
}