'use client'

import { User } from '@/lib/api';
import Date from "../date"

interface WelcomeSectionProps {
  user: User | null;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <section>
            <h1 className="text-3xl font-bold text-text mb-2">
        Welcome back, {user?.firstName || 'Reader'}!
      </h1>
      <p className="text-normalText text-lg">
        Continue your reading journey with personalized recommendations.
      </p>
      </section>
      <Date />

  
    </div>
  );
};