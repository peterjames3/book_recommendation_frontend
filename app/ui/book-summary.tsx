'use client';
import { RefreshCw } from 'lucide-react';

export default function BookSummary({
  description,
  needsDescription,
  onFetchDescription,
}: {
  description: string;
  needsDescription: boolean;
  onFetchDescription: () => void;
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Summary</h3>
        {needsDescription && (
          <button
            onClick={onFetchDescription}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Fetch Description
          </button>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </section>
  );
}
