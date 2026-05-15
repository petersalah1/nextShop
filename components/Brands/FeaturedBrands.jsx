'use client';

import Link from 'next/link';
import { useBrands } from '@/hooks/queries/useBrands';

function FeaturedBrands() {
const { data: brandsResponse, isLoading, isError } = useBrands();

const brands = brandsResponse?.data || [];
const featuredBrands = brands.slice(0, 6);

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-950">Popular Brands</h2>
          <p className="mt-4 text-gray-500">Loading brands...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-(--primary)">
              Popular Brands
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-950">
              Shop by Brand
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Discover products from trusted and popular brands.
            </p>
          </div>

          <Link
            href="/brands"
            className="w-fit rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary)"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredBrands?.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group flex min-h-40 flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-3">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-4 line-clamp-1 text-sm font-bold text-gray-950">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBrands;