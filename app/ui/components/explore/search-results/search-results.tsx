'use client';

import { Book } from '../../../../../context/books-store';

interface SearchResultsProps {
  results: Book[];
}
export default function SearchResults({ results }: SearchResultsProps) {
    return(
         <section className=" py-6 w-full bg-accent">
          <div className="mt-2 py-6 px-2 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]">

      <h2 className="text-xl font-bold mb-4">Search Results</h2>

      {results.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((book) => (
            <article
              key={book.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.authors?.join(', ') || 'Unknown Author'}</p>
              <span className="text-xs text-indigo-600">{book.categories?.[0] || 'Unknown Genre'}</span>
            </article>
          ))}
        </div>
      )}
      </div>
    </section>
  );

}