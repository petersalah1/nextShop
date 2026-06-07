'use client';

import Link from 'next/link';
import { useProducts } from '@/hooks/queries/useProducts';
import ProductCard from '../ProductCard';

function FeaturedProducts() {
  const { data: productsResponse, isError, isLoading } = useProducts();

  const products = productsResponse?.data || [];
  const featuredProducts = products.slice(0, 8);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <p className="mt-4 text-gray-500">Loading products...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <p className="mt-4 text-red-500">Something went wrong.</p>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-(--primary)">Our Products</span>

            <h2 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">Featured Products</h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500">Discover our latest selected products with great prices and fast delivery.</p>
          </div>

          <Link href="/products" className="hidden rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary) sm:inline-flex">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <Link href="/products" className="mt-8 flex w-full justify-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--primary) sm:hidden">
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
