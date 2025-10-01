// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/context/auth-store';
//import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      // Redirect to home page after successful login
      router.push('/dashboard');
    } catch (error) {
      // Error handling is done in the store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center bg-accent2">
      <div className=" w-full mx-auto max-w-full md:max-w-[840px] xl:max-w-[1040px] px-4 md:px-0 mt-[7rem] py-12 md:flex items-center gap-10 ">
        <div className='w-full md:w-1/2 px-2'>
             {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[2.25rem] font-bold text-text mb-2">
            LitKenya
          </h1>
          <p className="text-normalText text-lg">
            Explore books. Experience worlds.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
              <Link
            href="/login"
            className="flex-1 text-center py-2 text-normalText font-semibold border-b-2 border-normalText"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="flex-1 text-center py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Sign Up
          </Link>
        
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            Sign in to continue your reading journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-button-hover focus:ring-2 focus:ring-button-active hover:cursor-pointer focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing in...
              </div>
            ) : (
              "Let's Start"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Don&apos;t have an account?{' '}
            <Link href="/register" className="text-normaltext hover:text-button-active font-semibold">
              Sign up
            </Link>
          </p>
        </div>
        </div>
       
            <figure className='w-full md:w-1/2' >
                <Image
                src='/cuate.png'
                alt=' a picture of a lady reading book'
                width={600}
                height={900}
                className=' h-[40rem] object-fit' />

             
            </figure>
        
       
      </div>
    </div>
  );
}