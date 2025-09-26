interface GenreButtonProps {
  genre: string;
  isSelected: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function GenreButton({
  genre,
  isSelected,
  loading,
  onClick,
}: GenreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 rounded-full border transition  text-[1.1rem] ${
        isSelected
          ? "bg-primary text-text border-primary"
          : "bg-background text-text border-accent hover:bg-accent hover:cursor-pointer"
      } disabled:opacity-50`}
    >
      {loading ? "Loading..." : genre}
    </button>
  );
}
