'use client';

import { useState } from 'react';
import MainHero from "@/app/ui/components/explore/hero-section/hero.main";
import SearchResults from "@/app/ui/components/explore/search-results/search-results";
import GenreFilter from '@/app/ui/components/explore/genre-filter/genre-filter';
import { Book } from '../../context/books-store';
import Arrivals from '@/app/ui/components/explore/new-arrivals/arrivals';

export default function ExplorePage() {
    const [results, setResults] = useState<Book[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearchResults = (searchResults: Book[]) => {
        setResults(searchResults);
        setHasSearched(true);
    };

    return(
     <>
      {/* Pass callback down to MainHero */}
      <MainHero onSearchResults={handleSearchResults} />

      {/* Display results only if we have results or have performed a search */}
      {(hasSearched || results.length > 0) && (
        <div className="">
          <SearchResults results={results} />
        </div>
      )}

    
          <GenreFilter />
          <Arrivals />
      
     </>
    )
}