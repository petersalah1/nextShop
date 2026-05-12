'use client';

import Link from 'next/link';
import { useProducts } from '@/hooks/queries/useProducts';

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
            <span className="text-sm font-semibold text-(--primary)">
              Our Products
            </span>

            <h2 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">
              Featured Products
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Discover our latest selected products with great prices and fast delivery.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary) sm:inline-flex"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4">
                <p className="text-xs font-medium text-gray-400">
                  {product.category?.name}
                </p>

                <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold text-gray-950">
                  {product.title}
                </h3>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="font-bold text-(--primary)">
                    {product.price} EGP
                  </p>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                    ⭐ {product.ratingsAverage}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/products"
          className="mt-8 flex w-full justify-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--primary) sm:hidden"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;