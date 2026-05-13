'use client';

import { useBrands } from '@/hooks/queries/useBrands';
import Link from 'next/link';

function Brands() {
  const { data: brandsResponse, isError, isLoading } = useBrands();
  const allBrands = brandsResponse?.data || [];
  const featuredBrands = allBrands.slice(0, 8);

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-950">Featured Brands</h2>
          <p className="mt-4 text-gray-500">Loading brands...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-950">Featured Brands</h2>
          <p className="mt-4 text-red-500">Something went wrong.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-(--primary)">Our Brands</span>
            <h2 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">
              Featured Brands
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Discover selected brands and explore their latest products.
            </p>
          </div>

          <Link
            href="/brands"
            className="hidden rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary) sm:inline-flex"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredBrands.map((brand) => (
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

              <h3 className="mt-4 text-sm font-semibold text-gray-950">{brand.name}</h3>
            </Link>
          ))}
        </div>

        <Link
          href="/brands"
          className="mt-8 flex w-full justify-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--primary) sm:hidden"
        >
          View All Brands
        </Link>
      </div>
    </section>
  );
}

export default Brands;
