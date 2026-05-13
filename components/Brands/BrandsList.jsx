'use client';

import { useBrands } from '@/hooks/queries/useBrands';
import Link from 'next/link';

function BrandsList() {
  const { data: brandsResponse, isError, isLoading } = useBrands();
  const allBrands = brandsResponse?.data || [];
  const results = brandsResponse?.results || allBrands.length;

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-950">Brands</h1>
          <p className="mt-4 text-gray-500">Loading brands...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-950">Brands</h1>
          <p className="mt-4 text-red-500">Something went wrong.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-(--primary)">Our Brands</span>
            <h1 className="mt-2 text-3xl font-bold text-gray-950">All Brands</h1>
            <p className="mt-2 text-sm text-gray-500">
              Browse our available brands and explore their products.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-500">{results} brands found</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allBrands.map((brand) => (
            <Link
              href={`/brands/${brand._id}`}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              key={brand._id}
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-6">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-gray-950">{brand.name}</h2>
            </Link>
          ))}
        </div>

        {allBrands.length === 0 && (
          <p className="mt-10 text-center text-gray-500">No brands found.</p>
        )}
      </div>
    </section>
  );
}

export default BrandsList;
