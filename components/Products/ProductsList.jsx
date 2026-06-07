'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/queries/useProducts';
import ProductCard from '../ProductCard';
import PageHeader from '../shared/PageHeader';

function ProductsList() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');

  const productsParams = {
    page,
    limit: 20,
    ...(sort && { sort }),
  };

  const { data: productsResponse, isError, isLoading } = useProducts(productsParams);

  const allProducts = productsResponse?.data || [];
  const results = productsResponse?.results || 0;
  const metadata = productsResponse?.metadata;

  const currentPage = metadata?.currentPage || 1;
  const numberOfPages = metadata?.numberOfPages || 1;

  function handleSortChange(event) {
    setSort(event.target.value);
    setPage(1);
  }

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
        <PageHeader label="Our Store" title="All Products" description="Browse all available products and discover the best offers." rightContent={<p className="text-sm font-medium text-gray-500">{results} products found</p>} />

        {/* Sort */}
        <div className="mb-8 flex justify-end">
          <select value={sort} onChange={handleSortChange} className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 outline-none transition focus:border-(--primary) sm:w-64">
            <option value="">Default sorting</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-ratingsAverage">Top Rated</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {' '}
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {allProducts.length === 0 && <p className="mt-10 text-center text-gray-500">No products found.</p>}

        {/* Pagination */}
        {numberOfPages > 1 && (
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
        )}
      </div>
    </section>
  );
}

export default ProductsList;
