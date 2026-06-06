'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductDetails } from '@/hooks/queries/useProductDetails';
import { useAuth } from '@/contexts/AuthContext';
import { useAddToCart } from '@/hooks/mutations/useAddToCart';

function ProductDetails({ productId }) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const { data: product, isLoading, isError } = useProductDetails(productId);

  const {
    mutate: addToCart,
    isPending,
    isLoading: isAddingLoading,
  } = useAddToCart();

  const isAdding = isPending || isAddingLoading;

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product?.imageCover) {
      setSelectedImage(product.imageCover);
    }
  }, [product?.imageCover]);

  function handleAddToCart() {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart(product._id);
  }

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">Something went wrong.</p>
        </div>
      </section>
    );
  }

  const productImages = product.images || [];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Product Images */}
          <div>
            <div className="overflow-hidden rounded-[32px] bg-gray-100">
              <img
                src={selectedImage || product.imageCover}
                alt={product.title}
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />
            </div>

            {productImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {productImages.slice(0, 4).map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`overflow-hidden rounded-2xl border bg-gray-100 transition ${
                      selectedImage === image
                        ? 'border-(--primary) ring-2 ring-(--primary)/20'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={product.title}
                      className="h-24 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {product.category?.name && (
                <Link
                  href={`/categories/${product.category._id}`}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-(--primary) hover:text-white"
                >
                  {product.category.name}
                </Link>
              )}

              {product.brand?.name && (
                <Link
                  href={`/brands/${product.brand._id}`}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-(--primary) hover:text-white"
                >
                  {product.brand.name}
                </Link>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-semibold text-yellow-700">
                ⭐ {product.ratingsAverage}
              </span>

              <span className="text-sm text-gray-500">
                {product.ratingsQuantity} reviews
              </span>

              <span className="text-sm text-gray-500">
                {product.sold} sold
              </span>
            </div>

            <div className="mt-6">
              <p className="text-3xl font-bold text-(--primary)">
                {product.price} EGP
              </p>

              {product.quantity > 0 ? (
                <p className="mt-2 text-sm font-medium text-green-600">
                  In stock
                </p>
              ) : (
                <p className="mt-2 text-sm font-medium text-red-500">
                  Out of stock
                </p>
              )}
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-bold text-gray-950">Description</h2>

              <p className="mt-3 leading-7 text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding || product.quantity === 0}
                className="rounded-full bg-(--primary) px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>

              <button
                type="button"
                className="rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary)"
              >
                Add to Wishlist
              </button>
            </div>

            <div className="mt-8 grid gap-3 border-t border-gray-100 pt-8 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <h3 className="text-sm font-bold text-gray-950">
                  Fast Delivery
                </h3>
                <p className="mt-1 text-xs text-gray-500">Quick shipping.</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <h3 className="text-sm font-bold text-gray-950">
                  Secure Payment
                </h3>
                <p className="mt-1 text-xs text-gray-500">Safe checkout.</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <h3 className="text-sm font-bold text-gray-950">
                  Easy Returns
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Simple return policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;