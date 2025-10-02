// app/ui/components/dashboard/sidenav/UserGenresSection.tsx
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { UserGenresSectionProps } from "./types";

export default function UserGenresSection({ favoriteGenres }: UserGenresSectionProps) {
  if (favoriteGenres.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text flex items-center gap-2">
        <BookOpen size={20} />
        Your Genres
      </h3>
      <div className="space-y-2">
        {favoriteGenres.map((genre) => (
          <Link
            key={genre}
            href={`/books?genre=${encodeURIComponent(genre)}`}
            className="block p-2 rounded-lg bg-white hover:bg-primary hover:text-white transition-colors text-sm text-normalText hover:text-white"
          >
            {genre}
          </Link>
        ))}
      </div>
    </div>
  );
}