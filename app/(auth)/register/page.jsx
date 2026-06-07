'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/mutations/useRegister';
import { useAuth } from '@/contexts/AuthContext';

function RegisterPage() {
  const router = useRouter();

  const { login, isAuthenticated, isAuthReady } = useAuth();

  const {
    mutate: registerMutation,
    isPending,
    isLoading,
    error,
  } = useRegister();

  const isSubmitting = isPending || isLoading;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
  });

  const [clientError, setClientError] = useState('');

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthReady, isAuthenticated, router]);

  function handleChange(event) {
    const { name, value } = event.target;

    setClientError('');

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.rePassword) {
      setClientError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }

    registerMutation(formData, {
      onSuccess: (data) => {
        toast.success('Account created successfully');

        if (data?.token) {
          login({
            token: data.token,
            user: data.user,
          });

          router.push('/products');
          return;
        }

        router.push('/login');
      },

      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          'Registration failed. Please try again.';

        toast.error(message);
      },
    });
  }

  const apiErrorMessage =
    error?.response?.data?.message ||
    'Registration failed. Please try again.';

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-950">
            Create Account
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Create your account and start shopping.
          </p>
        </div>

        {(clientError || error) && (
          <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {clientError || apiErrorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="01000000000"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
            />
          </div>

          <div>
            <label
              htmlFor="rePassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="rePassword"
              name="rePassword"
              type="password"
              value={formData.rePassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-(--primary) hover:underline"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;