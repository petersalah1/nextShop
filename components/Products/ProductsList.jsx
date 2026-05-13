'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/queries/useProducts';
import Link from 'next/link';
import ProductCard from '../ProductCard';

function ProductsList() {
  const [page, setPage] = useState(1);

  const {
    data: productsResponse,
    isError,
    isLoading,
  } = useProducts({
    page,
    limit: 20,
  });

  const allProducts = productsResponse?.data || [];
  const results = productsResponse?.results || 0;
  const metadata = productsResponse?.metadata;

  const currentPage = metadata?.currentPage || 1;
  const numberOfPages = metadata?.numberOfPages || 1;

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-950">Products</h1>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-950">Products</h1>
          <p className="mt-4 text-red-500">Something went wrong.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-(--primary)">Our Store</span>

            <h1 className="mt-2 text-3xl font-bold text-gray-950">All Products</h1>

            <p className="mt-2 text-sm text-gray-500">Browse all available products and discover the best offers.</p>
          </div>

          <p className="text-sm font-medium text-gray-500">{results} products found</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {allProducts.length === 0 && <p className="mt-10 text-center text-gray-500">No products found.</p>}

        {/* Pagination */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-40">
            Previous
          </button>

          <span className="rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
            Page {currentPage} of {numberOfPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, numberOfPages))}
            disabled={currentPage === numberOfPages}
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-40">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductsList;
