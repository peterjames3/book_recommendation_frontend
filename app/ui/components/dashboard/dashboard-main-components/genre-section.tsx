// app/dashboard/components/GenreSection.tsx
import { BookSection } from './book-section';
import { Book } from '@/context/books-store';

interface GenreSectionProps {
  genre: string;
  books: Book[];
  isLoading?: boolean;
}

export const GenreSection: React.FC<GenreSectionProps> = ({
  genre,
  books,
  isLoading = false,
}) => {
  return (
    <BookSection
      title={`${genre} Books`}
      books={books}
      isLoading={isLoading}
      viewAllLink={`/books?genre=${encodeURIComponent(genre)}`}
      emptyMessage={`No ${genre} books found.`}
    />
  );
};