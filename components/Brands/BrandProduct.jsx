'use client';

import { useEffect, useState } from 'react';
import { useBrand } from '@/hooks/queries/useBrand';
import { useProducts } from '@/hooks/queries/useProducts';
import ProductCard from '../ProductCard';
import BrandHeader from './BrandHeader';

function BrandProduct({ brandId }) {
  const [page, setPage] = useState(1);

  const { data: brand } = useBrand(brandId);

  const {
    data: productsResponse,
    isError,
    isLoading,
  } = useProducts({
    page,
    limit: 20,
    brand: brandId,
  });

  useEffect(() => {
    setPage(1);
  }, [brandId]);

  const products = productsResponse?.data || [];
  const results = productsResponse?.results || 0;
  const metadata = productsResponse?.metadata;

  const currentPage = metadata?.currentPage || 1;
  const numberOfPages = metadata?.numberOfPages || 1;

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-950">Loading brand products...</h1>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-red-500">Something went wrong.</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BrandHeader brand={brand} results={results} />

        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {' '}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && <p className="mt-10 text-center text-gray-500">No products found for this brand.</p>}

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

export default BrandProduct;
