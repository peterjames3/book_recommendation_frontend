// app/dashboard/components/ErrorState.tsx
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Something went wrong', 
  onRetry 
}) => {
  return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-button-hover transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};