import { booksApi } from "@/lib/api";
import { Book } from "@/context/books-store";
import Image from "next/image";

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

  return (
    <div className="max-w-3xl mx-auto p-6 min-screen">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-600 mb-2">{book.authors?.join(", ")}</p>
      <p className="text-sm text-indigo-600 mb-6">
        {book.categories?.[0] || "Unknown Genre"}
      </p>
      <Image
        src={book.imageUrl || "/default-book-image.png"}
        width={300}
        height={400}
        alt={book.title}
        className="w-[18rem] h-[26rem] object-cover rounded shadow"
      />
    </div>
  );
}
