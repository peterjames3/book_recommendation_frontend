// app/dashboard/components/GenreTags.tsx
interface GenreTagsProps {
  genres: string[];
}

export const GenreTags: React.FC<GenreTagsProps> = ({ genres }) => {
  if (genres.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-text">Your Favorite Genres</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <span
            key={genre}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-button-hover transition-colors cursor-default"
          >
            {genre}
          </span>
        ))}
      </div>
    </section>
  );
};