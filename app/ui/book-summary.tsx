// app/ui/book-summary.tsx
'use client';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function BookSummary({
  description,
  needsDescription,
  onFetchDescription,
}: {
  description: string;
  needsDescription: boolean;
  onFetchDescription: () => Promise<void> | void;
}) {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchDescription = async () => {
    if (isFetching) return; 
    
    setIsFetching(true);
    try {
      await onFetchDescription();
    } catch (error) {
      console.error('Failed to fetch description:', error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Summary</h3>
        {needsDescription && (
          <button
            onClick={handleFetchDescription}
            disabled={isFetching}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} 
            />
            {isFetching ? 'Fetching desc...' : 'Fetch Description'}
          </button>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </section>
  );
}