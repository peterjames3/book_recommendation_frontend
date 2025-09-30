'use client';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoveLeft } from 'lucide-react';
import Loading from '@/app/ui/loading';
import { useBook, useBookDescription } from '@/hooks/useBook';
import { useRelatedBooks } from '@/hooks/useRelatedBooks';
import BookSummary from '@/app/ui/book-summary';
import RelatedBooks from '@/app/ui/related-books';

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: book, isError, isLoading, error } = useBook(id);
  const { data: bookDescription, refetch: refetchDescription } = useBookDescription(id, false);
  const { data: relatedBooks, isLoading: isRelatedLoading, isError: isRelatedError } = useRelatedBooks(id, !!book);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!book) return <div>Book not found</div>;

  const categories = Object.values(book.categories || {}) as string[];
  const needsDescription = book && (!book.description || book.description === 'No description available');
  const displayDescription = bookDescription || book?.description || 'No description available';

  return (
    <div className="mt-[10rem] w-full min-h-screen">
      <div className="w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]">
        <ul className="mb-3 flex items-center gap-2 text-xl text-text">
          <li>Explore</li>
          <span>/</span>
          <li>{categories[0] || 'categories unknown'}</li>
          <span>/</span>
          <li>{book.title}</li>
        </ul>
        <Link
          className="flex items-center justify-center gap-2 w-[10rem] py-2 px-6 rounded-md bg-primary text-text"
          href="/explore"
        >
          <MoveLeft />
          Go back
        </Link>
      </div>

      <div className="py-6 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex flex-col gap-10 lg:flex-row md:justify-between">
        {/* Book info */}
        <section className="w-full md:w-2/3">
          <div className="w-full flex items-center gap-2">
            <figcaption className="w-1/3">
              <Image
                src={book.imageUrl || '/default-book-image.png'}
                width={300}
                height={400}
                alt={book.title}
                className="w-[18rem] h-[26rem] object-fit rounded-r-2xl shadow"
              />
            </figcaption>
            <article className="w-2/3 space-y-8">
              <h2 className="headline font-bold mb-4">{book.title}</h2>
              {/* Categories */}
              <div className="flex gap-2 flex-wrap mb-6">
                {categories.length > 0 ? (
                  categories.map((cat, i) => (
                    <span key={i} className="py-[0.2rem] px-4 rounded-sm border border-primary text-[1rem] text-primary">
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Unknown Genre</span>
                )}
              </div>
              {/* ISBN, reviews, etc. */}
              <p className="text-gray-600 mb-2">
                <span className="font-semibold pr-2 text-[1.1rem]">ISBN:</span>
                <span className="font-semibold">{book.isbn}</span>
              </p>
              <p className="text-text text-xl">{book.authors?.join(', ')}</p>
            </article>
          </div>

          <BookSummary
            description={displayDescription}
            needsDescription={needsDescription}
            onFetchDescription={() => refetchDescription()}
          />
        </section>

        {/* Related books */}
        <RelatedBooks books={relatedBooks} isLoading={isRelatedLoading} isError={isRelatedError} />
      </div>
    </div>
  );
}
