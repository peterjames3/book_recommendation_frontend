// app/dashboard/components/OnboardingPrompt.tsx
import Link from 'next/link';

export const OnboardingPrompt: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-text mb-4">
        Popular Books
      </h2>
      <div className="text-center py-8">
        <p className="text-normalText mb-4">
          Complete your onboarding to get personalized book recommendations!
        </p>
        <Link
          href="/onboarding"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover transition-colors font-medium"
        >
          Complete Onboarding
        </Link>
      </div>
    </section>
  );
};