'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/mutations/useLogin';
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const router = useRouter();

  const { login, isAuthenticated, isAuthReady } = useAuth();

  const {
    mutate: loginMutation,
    isPending,
    isLoading,
    error,
  } = useLogin();

  const isSubmitting = isPending || isLoading;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthReady, isAuthenticated, router]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    loginMutation(formData, {
      onSuccess: (data) => {
        login({
          token: data.token,
          user: data.user,
        });

        router.push('/products');
      },
    });
  }

  const errorMessage =
    error?.response?.data?.message || 'Login failed. Please try again.';

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-950">Login</h1>

          <p className="mt-3 text-sm text-gray-500">
            Welcome back. Login to continue shopping.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don&apos;t have an account? </span>

          <Link
            href="/register"
            className="font-semibold text-(--primary) hover:underline"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;