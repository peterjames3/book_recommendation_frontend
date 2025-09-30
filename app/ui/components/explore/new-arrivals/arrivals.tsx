"use client";

import { useQuery } from "@tanstack/react-query";
import { booksApi } from "@/lib/api";
import { Book } from "@/context/books-store";
import { toast } from "react-hot-toast";
import BookGrid from "./book-grid";

export default function Arrivals() {
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["new-releases", 8],
    queryFn: () => booksApi.getNewReleases(8),
    staleTime: Infinity, // Prevents unnecessary refetches
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
  });

  // Extract books correctly
  const books = apiResponse?.success ? (apiResponse.data as Book[]) : [];

  if (isError) {
    toast.error("Failed to fetch new arrivals");
  }

  if (!isLoading && books.length === 0) {
    return <p>No books found</p>;
  }

  return (
    <section className="mt-12 w-full bg-background">
      <div className="py-8 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]">
        <h2 className="headline font-semibold mb-5">New Arrivals</h2>
        <BookGrid books={books} loading={isLoading} />
      </div>
    </section>
  );
}
