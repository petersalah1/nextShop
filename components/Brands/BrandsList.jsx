'use client';

import { useBrands } from '@/hooks/queries/useBrands';
import Link from 'next/link';
import PageHeader from '../shared/PageHeader';

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
        <PageHeader label="Popular Brands" title="Brands" description="Discover products from our available brands." />

        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allBrands.map((brand) => (
            <Link href={`/brands/${brand._id}`} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl" key={brand._id}>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-6">
                <img src={brand.image} alt={brand.name} className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110" />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-gray-950">{brand.name}</h2>
            </Link>
          ))}
        </div>

        {allBrands.length === 0 && <p className="mt-10 text-center text-gray-500">No brands found.</p>}
      </div>
    </section>
  );
}

export default BrandsList;
