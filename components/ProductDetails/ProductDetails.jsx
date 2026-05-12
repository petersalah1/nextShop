'use client';

import { useProductDetails } from '@/hooks/queries/useProductDetails';

function ProductDetails({ productId }) {
  const { data: product, isLoading, isError } = useProductDetails(productId);

  if (isLoading) {
    return <h1>Loading product...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full max-w-md rounded-3xl"
        />

        <h1 className="mt-6 text-3xl font-bold text-gray-950">
          {product.title}
        </h1>

        <p className="mt-3 text-gray-500">
          {product.description}
        </p>

        <p className="mt-5 text-2xl font-bold text-(--primary)">
          {product.price} EGP
        </p>
      </div>
    </section>
  );
}

export default ProductDetails;