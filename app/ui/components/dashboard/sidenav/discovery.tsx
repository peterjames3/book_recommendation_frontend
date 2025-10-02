// app/ui/components/dashboard/sidenav/DiscoverySection.tsx
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { DiscoverySectionProps } from "./types";

const DISCOVERY_GENRES = [
  'Mystery', 'Science Fiction', 'Biography', 'Self Help', 
  'Travel', 'Young Adult', 'Business', 'History'
];

export default function DiscoverySection({ discoveryGenres = DISCOVERY_GENRES }: DiscoverySectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text flex items-center gap-2">
        <TrendingUp size={20} />
        Discover More
      </h3>
      <div className="space-y-2">
        {discoveryGenres.map((genre) => (
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