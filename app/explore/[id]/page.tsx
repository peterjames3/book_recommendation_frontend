import { booksApi } from "@/lib/api";
import { Book } from "@/context/books-store";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from 'lucide-react';

interface BookPageProps {
  params: { id: string };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = params;

  // Fetch the book details
  let book: Book | null = null;
  try {
    const response = await booksApi.getBook(id);
    book = (response?.data as { book: Book })?.book;
  } catch (error) {
    console.error("Error fetching book details:", error);
  }

  if (!book) {
    return <div className="p-6">Book not found.</div>;
  }

  const categories = Object.values(book.categories || {});


  return (
    <div className='mt-[10rem] w-full min-h-screen' >
      <div className='w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px]'>
        <ul className=' mb-3 flex items-center gap-2 text-xl text-text'>
          <li>Explore</li>
          <span>/</span>
          <li className='space-x-2'>{book.categories?.[0] || "categories unknown"}</li>
          <span>/</span>
          <li>{book.title}</li>

        </ul>
        <Link className=' flex items-center justify-center gap-2 w-[10rem] py-2 px-6 rounded-md bg-primary text-text' href='/explore'> <MoveLeft />
          Go back</Link>
      </div>

      <div className='py-6 w-full mx-auto max-w-full lg:max-w-[1240px] xl:max-w-[1440px] flex  flex-col gap-10 lg:flex-row  md:justify-between'>

        <section className="w-full md:w-2/3 flex items-center gap-6">
          <figcaption>
            <Image
              src={book.imageUrl || "/default-book-image.png"}
              width={300}
              height={400}
              alt={book.title}
              className="w-[18rem] h-[26rem] object-fit rounded-r-2xl shadow"
            />
          </figcaption>
          <article className='space-y-2'>
            <h2 className="headline font-bold mb-4">{book.title}</h2>
            <div className="flex gap-2 flex-wrap mb-4">
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
                {book.ratingsCount || "Unknown Genre"})
              </span>
            </div>

            <p className="text-gray-600  mb-2"> <span className='font-semibold pr-2 text-[1.1rem]'>ISBN:</span>  <span className='font-semibold'>{book.isbn}</span></p>
            <p className="text-sm text-indigo-600 mb-6">
              {book.categories?.[0] || "Unknown Genre"}
            </p>
            <div className="flex items-center gap-2">
              <figure>
                <Image
                src='/image-avatar.png'
                alt='author profile image'
                width={70}
                height={70}
                className='rounded-full' />

                
              </figure>
              <article>

            <p className="text-text text-xl">{book.authors?.join(", ")}</p>
              </article>

            </div>
          </article>

        </section>
        <div className='w-full md:w-1/3'>

        </div>
      </div>
    </div>
  );
}
