"use client";

import { useState } from "react";
import { searchApi, ApiResponse } from "@/lib/api";
import { toast } from "react-hot-toast";
import { Book } from "../../../../../context/books-store";

interface SearchResponseData {
  books: Book[];
}

interface LeftHeroProps {
  onSearchResults: (results: Book[]) => void;
}

export default function LeftHero({ onSearchResults }: LeftHeroProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      const response = await searchApi.naturalLanguageSearch(query, { limit: 10 }) as ApiResponse<SearchResponseData>;

      // 👇 Debug logs
      console.log("Full search API response:", response);
      console.log("Response data:", response.data);
      console.log("Books array:", response.data?.books);

      if (response.success && response.data?.books && Array.isArray(response.data.books)) {
        onSearchResults(response.data.books);  // ✅ Pass the actual books array
      } else {
        onSearchResults([]);
        toast.error(response.message || "No results found");
      }

    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full w-full mx-auto px-6 pt-12'>
      <div className='flex items-center h-full'>
        <div>
          <h1 className="text-3xl sm:text-[2.5rem] lg:text-[3rem] xl:text-[4.1rem] font-bold mb-4 leading-tight">
            <span className="text-text pompiere-regular">LitKenya </span> -
            <span className="text-normalText">We Have Everything your are looking for </span>

          </h1>

          <p className="text-normalText mb-4 text-lg leading-relaxed">
            Discover millions of books from Open Library. Search by title, author, or browse by genre.
            <br />
            Search by title, author, or browse by genre.
          </p>

          <div className="flex items-center gap-2 px-4 py-8 border rounded-md  border-accent2 ">
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className=" text-text text-xl font-medium w-full border border-cardBg rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-button-hover"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-button-active text-white px-4 py-2 rounded-lg text-xl hover:bg-button-hover disabled:to-button-disabled hover:cursor-pointer"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
