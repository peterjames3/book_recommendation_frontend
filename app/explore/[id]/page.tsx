'use client';
import { useQuery } from '@tanstack/react-query';
import { booksApi, recommendationsApi } from "@/lib/api";
import { Book } from "@/context/books-store";
import { use } from 'react'
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from 'lucide-react';
import Loading from '@/app/ui/loading'
import RelatedBookSkeleton from "@/app/ui/components/skelton/relatedbook-skeleton";
import { useRouter } from 'next/navigation'


export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { isError, data: book, error, isLoading } = useQuery<Book, Error>({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await booksApi.getBook(id);
      return (response?.data as { book: Book })?.book;
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 2,
  });

  // Fetch related books (only when we have a book)
  const {
    data: relatedBooks,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
  } = useQuery<Book[], Error>({
    queryKey: ["related-books", id],
    queryFn: async () => {
      const response = await recommendationsApi.getSimilar(id, 4);
      return (response?.data as { similarBooks: Book[] })?.similarBooks || [];
    },
    enabled: !!book, // only fetch when main book is available
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });


  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!book) return <div>Book not found</div>;



  const categories = Object.values(book.categories || {}) as string[];


  return (
    <div className='mt-[10rem] w-full min-h-screen' >
      <div className='w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]'>
        <ul className=' mb-3 flex items-center gap-2 text-xl text-text'>
          <li>Explore</li>
          <span>/</span>
          <li className='space-x-2'>{categories[0] || "categories unknown"}</li>
          <span>/</span>
          <li>{book.title}</li>

        </ul>
        <Link className=' flex items-center justify-center gap-2 w-[10rem] py-2 px-6 rounded-md bg-primary text-text' href='/explore'> <MoveLeft />
          Go back</Link>
      </div>

      <div className='py-6 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex  flex-col gap-10 lg:flex-row  md:justify-between'>

        <section className="w-full md:w-2/3 ">
          <div className='w-full flex items-center gap-2'>
            <figcaption className='w-1/3'>
              <Image
                src={book.imageUrl || "/default-book-image.png"}
                width={300}
                height={400}
                alt={book.title}
                className="w-[18rem] h-[26rem] object-fit rounded-r-2xl shadow"
              />
            </figcaption>
            <article className='w-2/3 space-y-8'>
              <h2 className="headline font-bold mb-4">{book.title}</h2>
              <div className="flex gap-2 flex-wrap mb-6">
                {categories.length > 0 ? (
                  categories.map((cat, i) => (
                    <span key={i} className=" py-[0.2rem] px-4 rounded-sm  border border-primary text-[1rem] text-primary">
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Unknown Genre</span>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <header className='flex items-center'>
                  <h4><span className='text-xl font-semibold'>Reviews:</span> <span className='text-xl'>{book.rating}</span> </h4>

                </header>

                <span className="p-text text-button-active">(
                  {book.ratingsCount || 0})
                </span>
              </div>

              <p className="text-gray-600  mb-2"> <span className='font-semibold pr-2 text-[1.1rem]'>ISBN:</span>  <span className='font-semibold'>{book.isbn}</span></p>
              <div className='flex items-center gap-6'>
                <p className="text-[1.1rem] text-text ">
                  <span className=' text-text font-semibold'>Status : </span>

                  {book.availability || "Unknown availability"}
                </p>
                <p className='text-[1.1rem]'><span className='text-text font-semibold '>Page Count:</span> <span>{book.pageCount}</span></p>

              </div>

              <div className="flex items-center gap-2">
                <figure>
                  <Image
                    src='/image-avatar.png'
                    alt='author profile image'
                    width={60}
                    height={60}
                    className='rounded-full' />


                </figure>
                <article>

                  <p className="text-text text-xl">{book.authors?.join(", ")}</p>
                </article>

              </div>
            </article>
          </div>
          <section className='mt-6'>
            <h3 className=''>Summary</h3>
            <p>
              {book.description || "No Description Available for this book"}
            </p>


          </section>

        </section>
        <section className='w-full md:w-1/3 rounded-sm bg-accent3 p-3'>
          <h2 className='title font-semibold  mb-4'>Related Books</h2>
          {isRelatedLoading && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <RelatedBookSkeleton key={i} />
              ))}
            </div>
          )}
          {isRelatedError && <p>Failed to load related books</p>}
          {relatedBooks && relatedBooks.length > 0 ? (
            <div className="grid gap-4">
              {relatedBooks.map((relBook) => (
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
                    <h4 className=" text-[1.2rem] font-medium">{relBook.title}</h4>
                    <p className="p-text text-text">
                      {relBook.authors?.join(", ") || "Unknown Author"}
                    </p>
                    <div className='flex items-center gap-2 mt-2'>
                      <header className='flex items-center'>
                        <h4><span className='p-text font-semibold'>Reviews:</span> <span className='p-text'>{book.rating}</span> </h4>

                      </header>

                      <span className="p-text text-button-active">(
                        {book.ratingsCount || 0})
                      </span>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No related  books found. </p>
          )}

        </section>
      </div>
    </div>
  );
}
