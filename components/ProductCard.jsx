'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAddToCart } from '@/hooks/mutations/useAddToCart';
import { useWishlistQuery } from '@/hooks/queries/useWishlist';
import { useAddToWishlist } from '@/hooks/mutations/useAddToWishlist';
import { useRemoveFromWishlist } from '@/hooks/mutations/useRemoveFromWishlist';

function ProductCard({ product }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const {
    mutate: addToCart,
    isPending: isAddingToCartPending,
    isLoading: isAddingToCartLoading,
  } = useAddToCart();

  const { data: wishlistResponse } = useWishlistQuery();

  const {
    mutate: addToWishlist,
    isPending: isAddingToWishlistPending,
    isLoading: isAddingToWishlistLoading,
  } = useAddToWishlist();

  const {
    mutate: removeFromWishlist,
    isPending: isRemovingFromWishlistPending,
    isLoading: isRemovingFromWishlistLoading,
  } = useRemoveFromWishlist();

  const isAddingToCart = isAddingToCartPending || isAddingToCartLoading;

  const isWishlistActionLoading =
    isAddingToWishlistPending ||
    isAddingToWishlistLoading ||
    isRemovingFromWishlistPending ||
    isRemovingFromWishlistLoading;

  const wishlistProducts = wishlistResponse?.data || [];

  const isWishlisted = wishlistProducts.some(
    (wishlistProduct) => wishlistProduct._id === product._id
  );

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  function handleAddToCart() {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    addToCart(product._id);
  }

  function handleWishlistClick() {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product._id);
      return;
    }

    addToWishlist(product._id);
  }

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

        <button
          type="button"
          onClick={handleWishlistClick}
          disabled={isWishlistActionLoading}
          className={`absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur transition disabled:cursor-not-allowed disabled:opacity-60 ${
            isWishlisted
              ? 'bg-(--primary) text-white'
              : 'bg-white/90 text-gray-700 hover:bg-(--primary) hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
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
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="mt-4 w-full cursor-pointer rounded-full bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;