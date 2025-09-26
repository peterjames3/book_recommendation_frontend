// components/book-card-skeleton.tsx
export default function BookCardSkeleton() {
    return (
        <div className="animate-pulse bg-background rounded-sm shadow-sm overflow-hidden">
            {/* Image placeholder */}
            <div className="h-[23rem] w-full bg-gray-300"></div>

            {/* Content placeholder */}
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
}
