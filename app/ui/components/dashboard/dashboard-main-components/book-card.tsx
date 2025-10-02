// app/dashboard/components/BookCard.tsx
import Link from 'next/link';
import { Book } from '@/context/books-store';
import Image from 'next/image'

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link href={`/books/${book.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 h-full">
        <div className="aspect-[3/4] bg-gray-200 rounded mb-3 overflow-hidden">
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={600}
              height={700}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-text line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-normalText text-sm mb-2 line-clamp-1">
          {book.authors?.join(', ') || 'Unknown Author'}
        </p>
        {book.rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-normalText">
              {book.rating} ({book.ratingsCount || 0})
            </span>
          </div>
        )}
        {book.price && (
          <p className="text-text font-medium mt-2">${book.price}</p>
        )}
      </div>
    </Link>
  );
};