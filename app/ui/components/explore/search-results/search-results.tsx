'use client';

import { Book } from '../../../../../context/books-store';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, ExternalLink } from 'lucide-react';

interface SearchResultsProps {
  results: Book[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (!text || text === 'No description available') return 'No description available';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getBookSource = (book: Book): string => {
    // Check if book has Open Library ID or other indicators
    if (book.openLibraryId || book.description?.includes('Open Library') ) {
      return 'open-library';
    }
    return 'internal';
  };

  return (
    <section className="py-6 w-full bg-accent">
      <div className="mt-2 py-6 px-2 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">Search Results</h2>
          {results.length > 0 && (
            <span className="text-normalText">
              Found {results.length} book{results.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl text-normalText mb-2">No books found</p>
            <p className="text-text">
              Try different keywords or check your search filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((book) => {
              const source = getBookSource(book);
              
              return (
                <article
                  key={book.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {/* Book Image */}
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                    <Image
                      src={book.imageUrl || "/default-book-image.png"}
                      alt={book.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Source Badge */}
                    {source === 'open-library' && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                          <ExternalLink className="h-3 w-3" />
                          Open Library
                        </span>
                      </div>
                    )}
                    
                    {/* Rating Badge */}
                    {book.rating && (
                      <div className="absolute bottom-2 left-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                          <Star className="h-3 w-3 fill-current" />
                          {book.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/explore/${book.id}`}>
                        {book.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                      by {book.authors?.join(', ') || 'Unknown Author'}
                    </p>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3 leading-relaxed">
                      {truncateDescription(book.description || 'No description available')}
                    </p>

                    {/* Categories */}
                    {book.categories && book.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {book.categories.slice(0, 2).map((category, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Book Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="space-y-1">
                        {book.publishedDate && (
                          <p className="text-xs">Published: {book.publishedDate}</p>
                        )}
                        {book.pageCount && (
                          <p className="text-xs">{book.pageCount} pages</p>
                        )}
                      </div>
                      
                      {/* Ratings Count */}
                      {book.ratingsCount && book.ratingsCount > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{book.ratingsCount}</span>
                        </div>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      {book.price ? (
                        <div className="text-lg font-semibold text-green-600">
                          ${book.price}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Price unavailable
                        </div>
                      )}
                      
                      <Link
                        href={`/explore/${book.id}`}
                        className="bg-button-active text-white py-2 px-4 rounded-lg hover:bg-button-hover transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>

                    {/* Availability */}
                    <div className="mt-3">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        book.availability === 'available' 
                          ? 'bg-green-100 text-green-800'
                          : book.availability === 'out_of_stock'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {book.availability === 'available' ? 'In Stock' : 
                         book.availability === 'out_of_stock' ? 'Out of Stock' : 
                         'Pre Order'}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}