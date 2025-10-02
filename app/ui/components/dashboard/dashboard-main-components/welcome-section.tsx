// app/dashboard/components/WelcomeSection.tsx

import { User } from '@/lib/api';

interface WelcomeSectionProps {
  user: User | null;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  return (
    <section className="mb-8">
      <h1 className="text-3xl font-bold text-text mb-2">
        Welcome back, {user?.firstName || 'Reader'}!
      </h1>
      <p className="text-normalText text-lg">
        Continue your reading journey with personalized recommendations.
      </p>
    </section>
  );
};