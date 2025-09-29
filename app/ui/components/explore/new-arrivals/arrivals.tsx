"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { recommendationsApi } from "@/lib/api";
import { Book } from "@/context/books-store";
import { toast } from "react-hot-toast";
//import GenreButton from "./genre-button";
import BookGrid from "./book-grid";

export default function Arrivals
() {
  const [selectedGenre, setSelectedGenre] = useState<string>("Fiction");

  const {
    data: apiResponse,
    isLoading,
    
    isError,
  } = useQuery({
    queryKey: ['books-by-genre', selectedGenre],
    queryFn: () => recommendationsApi.getByGenre(selectedGenre, { limit: 8 }),
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
        <h2 className="headline font-semibold mb-4">New Arrivals</h2>

    

        {/* Book grid */}
        {selectedGenre && (
          <BookGrid 
            genre={selectedGenre} 
            books={books} 
            loading={isLoading} 
          />
        )}
      </div>
    </section>
  );
}