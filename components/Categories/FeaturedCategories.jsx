'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/queries/useCategories';

function FeaturedCategories() {
  const { data: categories = [], isLoading, isError } = useCategories();

  const featuredCategories = categories.slice(0, 6);

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-950">
            Shop by Category
          </h2>
          <p className="mt-4 text-gray-500">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-(--primary)">
              Shop by Category
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-950">
              Explore Categories
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Find what you need faster by browsing our main product categories.
            </p>
          </div>

          <Link
            href="/categories"
            className="w-fit rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary)"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredCategories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="line-clamp-1 text-sm font-bold text-gray-950">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;