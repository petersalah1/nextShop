'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
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
    isPending: isAddingToCart,
  } = useAddToCart();

  const { data: wishlistResponse } = useWishlistQuery();

  const {
    mutate: addToWishlist,
    isPending: isAddingToWishlist,
  } = useAddToWishlist();

  const {
    mutate: removeFromWishlist,
    isPending: isRemovingFromWishlist,
  } = useRemoveFromWishlist();

  const wishlistProducts = wishlistResponse?.data || [];

  const isWishlisted = wishlistProducts.some(
    (wishlistProduct) => wishlistProduct._id === product._id
  );

  const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  function handleAddToCart() {
    if (!isAuthenticated) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    addToCart(product._id);
  }

  function handleWishlistClick() {
    if (!isAuthenticated) {
      toast.error('Please login first');
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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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
          disabled={isWishlistLoading}
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition disabled:cursor-not-allowed disabled:opacity-60 sm:right-3 sm:top-3 cursor-pointer ${
            isWishlisted
              ? 'bg-(--primary) text-white'
              : 'bg-white/90 text-gray-700 hover:bg-(--primary) hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i
            className={
              isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
            }
          ></i>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="line-clamp-1 text-[11px] font-medium text-gray-400 sm:text-xs">
          {product.category?.name}
        </p>

        <Link href={`/products/${product._id}`} className="mt-2 block">
          <h3 className="line-clamp-2 min-h-10 text-[13px] font-bold leading-5 text-gray-950 transition hover:text-(--primary) sm:text-sm">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex min-h-14 items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {hasDiscount ? (
              <>
                <p className="text-sm font-bold leading-5 text-(--primary) sm:text-base">
                  {product.priceAfterDiscount} EGP
                </p>

                <p className="text-xs font-medium leading-4 text-gray-400 line-through sm:text-sm">
                  {product.price} EGP
                </p>
              </>
            ) : (
              <p className="text-sm font-bold leading-5 text-(--primary) sm:text-base">
                {product.price} EGP
              </p>
            )}
          </div>

          <span className="flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600 sm:text-xs">
            <i className="fa-solid fa-star text-yellow-400"></i>
            {product.ratingsAverage}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="mt-auto flex h-11 w-full items-center justify-center rounded-full bg-(--primary) px-3 text-xs font-semibold text-white transition hover:bg-gray-950 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
        >
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;