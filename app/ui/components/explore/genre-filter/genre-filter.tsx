"use client";

import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("Fiction"); // default Fiction
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async (genre: string) => {
    setLoading(true);
    try {
      const response = await recommendationsApi.getByGenre(genre, { limit: 10 });
      if (response.success && response.data?.books) {
        setBooks(response.data.books as Book[]);
      } else {
        setBooks([]);
        toast.error("No books found for this genre");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books by genre");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    fetchBooks(genre);
  };

  // 🔹 Fetch Fiction books on first render
  useEffect(() => {
    fetchBooks("Fiction");
  }, []);

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
              loading={loading && selectedGenre === genre}
              onClick={() => handleGenreClick(genre)}
            />
          ))}
        </div>

        {/* Book grid */}
        {selectedGenre && (
          <GenreBookGrid genre={selectedGenre} books={books} loading={loading} />
        )}
      </div>
    </section>
  );
}
