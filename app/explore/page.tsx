'use client';

import { useState } from 'react';
import MainHero from "@/app/ui/components/explore/hero-section/hero.main";
import SearchResults from "@/app/ui/components/explore/search-results/search-results";
import GenreFilter from '@/app/ui/components/explore/genre-filter/genre-filter';
import { Book } from '../../context/books-store';
export default function ExplorePage() {
    const [results, setResults] = useState<Book[]>([]);
    return(
     <>
      {/* Pass callback down to MainHero */}
      <MainHero onSearchResults={setResults} />

      {/* Display results here */}
      <div className="">
        <SearchResults results={results} />
      </div>
      <GenreFilter />
     </>
    )
}