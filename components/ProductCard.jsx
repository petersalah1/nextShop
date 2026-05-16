'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product._id}`} className="block h-full w-full">
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        {/* TODO: Connect to wishlist context later */}
        <button
          type="button"
          className="absolute right-3 top-3 cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition hover:bg-(--primary) hover:text-white"
          aria-label="Add to wishlist"
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-gray-400">
          {product.category?.name}
        </p>

        <Link href={`/products/${product._id}`}>
          <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold text-gray-950 transition hover:text-(--primary)">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <p className="font-bold text-(--primary)">
                  {product.priceAfterDiscount} EGP
                </p>

                <p className="text-sm font-medium text-gray-400 line-through">
                  {product.price} EGP
                </p>
              </>
            ) : (
              <p className="font-bold text-(--primary)">
                {product.price} EGP
              </p>
            )}
          </div>

          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
            ⭐ {product.ratingsAverage}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-4 w-full rounded-full cursor-pointer bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-950"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;