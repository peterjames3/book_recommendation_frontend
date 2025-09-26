"use client";

import { Book } from "@/context/books-store";
import BookCard from "./book-card";
import { useRouter } from "next/navigation";
import BookCardSkeleton from "../../skelton/bookcard-skeleton";

interface GenreBookGridProps {
  genre: string;
  books: Book[];
  loading: boolean;
}

export default function GenreBookGrid({ genre, books, loading }: GenreBookGridProps) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!books.length) return <p>No books found for {genre}.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          onClick={() => router.push(`/explore/${book.id}`)}
          className="cursor-pointer"
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
