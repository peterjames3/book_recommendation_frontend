// app/ui/components/dashboard/sidenav/SearchSection.tsx
import { Search, Filter } from "lucide-react";
import { SearchSectionProps } from "./types";

const SEARCH_TYPES = [
  { value: "all", label: "Everything" },
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "theme", label: "Theme/Genre" },
  { value: "plot", label: "Plot/Description" },
];

export default function SearchSection({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  isLoading,
  onSearch,
  showAdvanced,
  setShowAdvanced,
}: SearchSectionProps) {
  return (
    <div className="mb-6">
      <form onSubmit={onSearch} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, author, theme, plot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-button-hover disabled:opacity-50"
          >
            {isLoading ? '...' : 'Go'}
          </button>
        </div>

        {/* Advanced Search Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-primary hover:text-button-hover"
        >
          <Filter size={16} />
          Advanced Search
        </button>

        {/* Advanced Search Options */}
        {showAdvanced && (
          <div className="space-y-2 p-3 bg-white rounded-lg border">
            <label className="block text-sm font-medium text-text mb-2">
              Search by:
            </label>
            <div className="space-y-2">
              {SEARCH_TYPES.map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="searchType"
                    value={type.value}
                    checked={searchType === type.value}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}