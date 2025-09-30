"use client";

import { useState } from "react";
import { searchApi, booksApi, ApiResponse } from "@/lib/api";
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
  const [searchType, setSearchType] = useState<'internal' | 'external'>('internal');

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      let response: ApiResponse<SearchResponseData>;

      if (searchType === 'external') {
        // Use enhanced Open Library search
        console.log("🔍 Searching Open Library for:", query);
        response = await booksApi.searchEnhanced(query, { 
          limit: 20, 
          includeDescriptions: true 
        }) as ApiResponse<SearchResponseData>;
      } else {
        // Use internal search
        console.log("🔍 Searching internal database for:", query);
        response = await searchApi.naturalLanguageSearch(query, { 
          limit: 20 
        }) as ApiResponse<SearchResponseData>;
      }

      // Debug logs
      console.log("Full search API response:", response);
      console.log("Response data:", response.data);
      console.log("Books array:", response.data?.books);
      console.log("Search type:", searchType);

      if (response.success && response.data?.books && Array.isArray(response.data.books)) {
        const booksWithDescriptions = response.data.books.map(book => ({
          ...book,
          // Ensure description is never null
          description: book.description || "No description available"
        }));
        
        onSearchResults(booksWithDescriptions);
        
        // Show success message
        toast.success(`Found ${booksWithDescriptions.length} books from ${searchType === 'external' ? 'Open Library' : 'our database'}`);
      } else {
        onSearchResults([]);
        toast.error(response.message || "No results found");
      }

    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='h-full w-full mx-auto px-6 pt-12'>
      <div className='flex items-center h-full'>
        <div>
          <h1 className="text-3xl sm:text-[2.5rem] lg:text-[3rem] xl:text-[4.1rem] font-bold mb-4 leading-tight">
            <span className="text-text pompiere-regular">LitKenya </span> -
            <span className="text-normalText">We Have Everything You&apos;re Looking For</span>
          </h1>

          <p className="text-normalText mb-4 text-lg leading-relaxed">
            Discover millions of books from Open Library and our database. 
            Search by title, author, or browse by genre.
            <br />
            Find your next favorite read with detailed descriptions and ratings.
          </p>

          {/* Search Type Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="internal"
                checked={searchType === 'internal'}
                onChange={(e) => setSearchType(e.target.value as 'internal' | 'external')}
                className="text-button-active focus:ring-button-active"
              />
              <span className="text-text">Our Library</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="external"
                checked={searchType === 'external'}
                onChange={(e) => setSearchType(e.target.value as 'internal' | 'external')}
                className="text-button-active focus:ring-button-active"
              />
              <span className="text-text">Open Library</span>
            </label>
            
            {searchType === 'external' && (
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Enhanced Descriptions
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 px-4 py-8 border rounded-md border-accent2">
            <input
              type="text"
              placeholder={
                searchType === 'external' 
                  ? "Search Open Library for books with detailed descriptions..." 
                  : "Search our book database..."
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-text text-xl font-medium w-full border border-cardBg rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-button-hover"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="bg-button-active text-white px-6 py-2 rounded-lg text-xl hover:bg-button-hover disabled:bg-button-disabled hover:cursor-pointer transition-colors duration-200 min-w-[120px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Searching...
                </div>
              ) : (
                "Search"
              )}
            </button>
          </div>

          {/* Search Tips */}
          <div className="mt-4 text-sm text-normalText">
            <p>
              <strong>Tip:</strong> {searchType === 'external' 
                ? "Open Library search provides detailed book descriptions, ratings, and comprehensive metadata."
                : "Our library search focuses on curated content with availability information."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}