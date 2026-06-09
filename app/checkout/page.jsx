'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCartQuery } from '@/hooks/queries/useCart';
import { useCreateCashOrder } from '@/hooks/mutations/useCreateCashOrder';
import { useCreateCheckoutSession } from '@/hooks/mutations/useCreateCheckoutSession';
import { getErrorMessage } from '@/lib/getErrorMessage';

function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();

  const {
    data: cartResponse,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useCartQuery();

  const {
    mutate: createCashOrder,
    isPending: isCashPending,
    isLoading: isCashLoading,
    error: cashError,
  } = useCreateCashOrder();

  const {
    mutate: createOnlinePayment,
    isPending: isOnlinePending,
    isLoading: isOnlineLoading,
    error: onlineError,
  } = useCreateCheckoutSession();

  const [formData, setFormData] = useState({
    details: '',
    phone: '',
    city: '',
  });

  const isCreatingCashOrder = isCashPending || isCashLoading;
  const isCreatingOnlinePayment = isOnlinePending || isOnlineLoading;
  const isSubmitting = isCreatingCashOrder || isCreatingOnlinePayment;

  const cartData = cartResponse?.data;
  const cartId = cartData?._id;
  const cartItems = cartData?.products || [];
  const cartTotal = cartData?.totalCartPrice || 0;

  const error = cashError || onlineError;
  const errorMessage = getErrorMessage(
    error,
    'Could not complete checkout. Please try again.'
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function getShippingAddress() {
    return {
      details: formData.details.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
    };
  }

  function getOnlineShippingAddress() {
    return {
      details: formData.details.trim() || 'Online payment order',
      phone: formData.phone.trim() || '01000000000',
      city: formData.city.trim() || 'Cairo',
    };
  }

  function handleCashOrder(event) {
    event.preventDefault();

    if (!cartId) {
      return;
    }

    createCashOrder(
      {
        cartId,
        shippingAddress: getShippingAddress(),
      },
      {
        onSuccess: () => {
          router.push('/allorders');
        },
      }
    );
  }

  function handleOnlinePayment() {
    if (!cartId) {
      return;
    }

    const paymentTab = window.open('', '_blank');

    createOnlinePayment(
      {
        cartId,
        shippingAddress: getOnlineShippingAddress(),
        redirectUrl: window.location.origin,
      },
      {
        onSuccess: (data) => {
          const paymentUrl = data?.session?.url || data?.url;

          if (paymentUrl && paymentTab) {
            paymentTab.location.href = paymentUrl;
            return;
          }

          if (paymentUrl && !paymentTab) {
            window.location.href = paymentUrl;
            return;
          }

          if (paymentTab) {
            paymentTab.close();
          }

          toast.error('Payment link was not returned. Please try again.');
        },
        onError: () => {
          if (paymentTab) {
            paymentTab.close();
          }
        },
      }
    );
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

          <p className="mt-3 text-gray-500">Please login before checkout.</p>

          <button
            type="button"
            onClick={() => router.push('/login')}
            className="mt-8 inline-flex rounded-full bg-(--primary) px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-950"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  if (isCartLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Loading checkout...</p>
        </div>
      </section>
    );
  }

  if (isCartError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">
            Something went wrong
          </h1>

          <p className="mt-3 text-red-500">We could not load your cart.</p>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add products to your cart before checkout.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-(--primary) px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-950"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div>
          <span className="text-sm font-semibold text-(--primary)">
            Checkout
          </span>

          <h1 className="mt-2 text-3xl font-bold text-gray-950">
            Shipping Address
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your delivery information and choose your payment method.
          </p>

          {error && (
            <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleCashOrder} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="details"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Address Details
              </label>

              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Street, building, floor, apartment..."
                className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="01000000000"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                City
              </label>

              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Cairo"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-(--primary)"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={isSubmitting || !cartId}
                className="w-full rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingCashOrder ? 'Creating order...' : 'Pay Cash'}
              </button>

              <button
                type="button"
                onClick={handleOnlinePayment}
                disabled={isSubmitting || !cartId}
                className="w-full rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingOnlinePayment ? 'Redirecting...' : 'Pay Online'}
              </button>
            </div>
          </form>
        </div>

        <aside className="h-fit rounded-3xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-950">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {cartItems.map((item) => {
              const product = item.product;
              const productId = product?._id || product;

              return (
                <div key={item._id} className="flex gap-3">
                  <Link
                    href={`/products/${productId}`}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                  >
                    {product?.imageCover && (
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-gray-950">
                      {product?.title || 'Product'}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.count}
                    </p>

                    <p className="mt-1 text-sm font-bold text-(--primary)">
                      {item.price} EGP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-950">Total</span>
              <span className="text-2xl font-bold text-(--primary)">
                {cartTotal} EGP
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
