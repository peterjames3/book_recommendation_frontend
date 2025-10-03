// app/profile/page.tsx
'use client';

import { ProfileForm } from '@/app/ui/components/dashboard/profile-page/profile-form';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text">Your Profile</h1>
          <p className="text-normalText mt-2">
            Manage your account information and preferences
          </p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}