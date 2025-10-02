// app/dashboard/components/BookSection.tsx
import Link from 'next/link';
import { Book } from '@/context/books-store';
import { BookCard } from './book-card';

interface BookSectionProps {
  title: string;
  books: Book[];
  isLoading?: boolean;
  viewAllLink?: string;
  emptyMessage?: string;
}

export const BookSection: React.FC<BookSectionProps> = ({
  title,
  books,
  isLoading = false,
  viewAllLink,
  emptyMessage = 'No books available',
}) => {
  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-text">{title}</h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-primary hover:text-button-hover font-medium"
            >
              See all
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-text">{title}</h2>
        {viewAllLink && books.length > 0 && (
          <Link 
            href={viewAllLink}
            className="text-primary hover:text-button-hover font-medium"
          >
            See all
          </Link>
        )}
      </div>
      {books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-normalText">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
};

const BookCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="aspect-[3/4] bg-gray-200 rounded mb-3"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
  </div>
);