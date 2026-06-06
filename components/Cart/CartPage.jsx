'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCartQuery } from '@/hooks/queries/useCart';
import { useUpdateCartItem } from '@/hooks/mutations/useUpdateCartItem';
import { useRemoveCartItem } from '@/hooks/mutations/useRemoveCartItem';
import { useClearCart } from '@/hooks/mutations/useClearCart';

function CartPage() {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();

  const { data: cartResponse, isLoading, isError } = useCartQuery();

  const { mutate: updateCartItem, isPending: isUpdating, isLoading: isUpdatingLoading } = useUpdateCartItem();

  const { mutate: removeCartItem, isPending: isRemoving, isLoading: isRemovingLoading } = useRemoveCartItem();

  const { mutate: clearCart, isPending: isClearing, isLoading: isClearingLoading } = useClearCart();

  const isCartActionLoading = isUpdating || isUpdatingLoading || isRemoving || isRemovingLoading || isClearing || isClearingLoading;

  const cartData = cartResponse?.data;
  const cartItems = cartData?.products || [];
  const cartCount = cartResponse?.numOfCartItems || 0;
  const cartTotal = cartData?.totalCartPrice || 0;

  function handleIncrease(item) {
    const productId = item.product?._id || item.product;
    const nextCount = item.count + 1;

    updateCartItem({
      productId,
      count: nextCount,
    });
  }

  function handleDecrease(item) {
    const productId = item.product?._id || item.product;
    const nextCount = item.count - 1;

    if (nextCount < 1) {
      removeCartItem(productId);
      return;
    }

    updateCartItem({
      productId,
      count: nextCount,
    });
  }

  function handleRemove(item) {
    const productId = item.product?._id || item.product;

    removeCartItem(productId);
  }

  function handleClearCart() {
    clearCart();
  }

  if (!isAuthReady) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">Login required</h1>

          <p className="mt-3 text-gray-500">Please login to view your cart.</p>

          <button type="button" onClick={() => router.push('/login')} className="mt-8 inline-flex rounded-full bg-(--primary) px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-950">
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Loading cart...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">Something went wrong</h1>

          <p className="mt-3 text-red-500">We could not load your cart.</p>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">Your cart is empty</h1>

          <p className="mt-3 text-gray-500">Start shopping and add some products to your cart.</p>

          <Link href="/products" className="mt-8 inline-flex rounded-full bg-(--primary) px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-950">
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-(--primary)">Shopping Cart</span>

            <h1 className="mt-2 text-3xl font-bold text-gray-950">Your Cart</h1>

            <p className="mt-2 text-sm text-gray-500">You have {cartCount} items in your cart.</p>
          </div>

          <button
            type="button"
            onClick={handleClearCart}
            disabled={isCartActionLoading}
            className="w-fit rounded-full border border-red-100 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">
            {isClearing || isClearingLoading ? 'Clearing...' : 'Clear Cart'}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              const product = item.product;
              const productId = product?._id || product;

              return (
                <div key={item._id} className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
                  <Link href={`/products/${productId}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    {product?.imageCover ? <img src={product.imageCover} alt={product.title} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">No image</div>}
                  </Link>

                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div>
                      <Link href={`/products/${productId}`} className="line-clamp-2 font-semibold text-gray-950 transition hover:text-(--primary)">
                        {product?.title || 'Product'}
                      </Link>

                      <p className="mt-2 font-bold text-(--primary)">{item.price} EGP</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-gray-200">
                        <button type="button" onClick={() => handleDecrease(item)} disabled={isCartActionLoading} className="cursor-pointer px-4 py-2 text-xl font-bold hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-50">
                          -
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold text-gray-950">{item.count}</span>

                        <button type="button" onClick={() => handleIncrease(item)} disabled={isCartActionLoading} className="cursor-pointer px-4 py-2 text-xl font-bold hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-50">
                          +
                        </button>
                      </div>

                      <button type="button" onClick={() => handleRemove(item)} disabled={isCartActionLoading} className="text-sm font-semibold text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-950">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Items</span>
                <span className="font-semibold text-gray-950">{cartCount}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-950">{cartTotal} EGP</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-950">Total</span>
                  <span className="text-2xl font-bold text-(--primary)">{cartTotal} EGP</span>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="mt-6 flex w-full justify-center rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-950">
              Checkout
            </Link>

            <Link href="/products" className="mt-3 flex w-full justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary)">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
