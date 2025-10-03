// app/profile/components/ProfileForm.tsx
'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { useAuthStore } from '@/context/auth-store';
import { toast } from 'react-hot-toast';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export const ProfileForm: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateProfile({
          firstName: values.firstName,
          lastName: values.lastName,
          // Note: Email might require separate verification
        });
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } catch (error: unknown) {
        // Error handling is done in the store
      }
    },
  });

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-text mb-6">Profile Settings</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing || isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing || isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            disabled // Email might require special handling for changes
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Contact support to change your email address
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-button-hover transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-button-hover transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  formik.resetForm();
                }}
                disabled={isLoading}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};