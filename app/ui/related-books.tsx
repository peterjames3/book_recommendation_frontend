'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RelatedBookSkeleton from '@/app/ui/components/skelton/relatedbook-skeleton';
import { Book } from '@/context/books-store';

export default function RelatedBooks({
  books,
  isLoading,
  isError,
}: {
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  const router = useRouter();

  return (
    <section className="w-full md:w-1/3 rounded-sm bg-accent3 p-3">
      <h2 className="title font-semibold mb-4">Related Books</h2>
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <RelatedBookSkeleton key={i} />
          ))}
        </div>
      )}
      {isError && <p>Failed to load related books</p>}
      {books && books.length > 0 ? (
        <div className="grid gap-4">
          {books.map((relBook) => (
            <article
              key={relBook.id}
              onClick={() => router.push(`/explore/${relBook.id}`)}
              className="flex items-center gap-3 hover:cursor-pointer"
            >
              <Image
                src={relBook.imageUrl || "/default-book-image.png"}
                alt={relBook.title}
                width={200}
                height={400}
                className="w-30 h-40 object-cover rounded-r-md"
              />
              <div>
                <h4 className="text-[1.2rem] font-medium">{relBook.title}</h4>
                <p className="p-text text-text">
                  {relBook.authors?.join(", ") || "Unknown Author"}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        !isLoading && <p>No related books found.</p>
      )}
    </section>
  );
}
