'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlistQuery } from '@/hooks/queries/useWishlist';
import ProductCard from '@/components/ProductCard';

function WishListPage() {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();

  const { data: wishlistResponse, isLoading, isError } = useWishlistQuery();

  const wishlistProducts = wishlistResponse?.data || [];
  const wishlistCount = wishlistProducts.length;

  if (!isAuthReady) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">Login required</h1>

          <p className="mt-3 text-gray-500">Please login to view your wishlist.</p>

          <button type="button" onClick={() => router.push('/login')} className="mt-8 inline-flex rounded-full bg-(--primary) px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-950">
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Loading wishlist...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">Something went wrong</h1>

          <p className="mt-3 text-red-500">We could not load your wishlist.</p>
        </div>
      </section>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">Your wishlist is empty</h1>

          <p className="mt-3 text-gray-500">Save products you like and find them here later.</p>

          <Link href="/products" className="mt-8 inline-flex rounded-full bg-(--primary) px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-950">
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-(--primary)">Saved Products</span>

            <h1 className="mt-2 text-3xl font-bold text-gray-950">Your Wishlist</h1>

            <p className="mt-2 text-sm text-gray-500">You have {wishlistCount} products in your wishlist.</p>
          </div>

          <Link href="/products" className="w-fit rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary)">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {' '}
          {wishlistProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WishListPage;
