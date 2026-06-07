'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserOrders } from '@/hooks/queries/useUserOrders';

function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();

  const {
    data: ordersResponse,
    isLoading,
    isError,
  } = useUserOrders();

  const orders = Array.isArray(ordersResponse) ? ordersResponse : [];

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

          <p className="mt-3 text-gray-500">
            Please login to view your orders.
          </p>

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

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">
            Something went wrong
          </h1>

          <p className="mt-3 text-red-500">
            We could not load your orders.
          </p>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">
            No orders yet
          </h1>

          <p className="mt-3 text-gray-500">
            When you place an order, it will appear here.
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-semibold text-(--primary)">
            Order History
          </span>

          <h1 className="mt-2 text-3xl font-bold text-gray-950">
            Your Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            You have {orders.length} orders.
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const orderItems = order.cartItems || [];
            const orderDate = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : 'Unknown date';

            return (
              <article
                key={order._id || order.id}
                className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-bold text-gray-950">
                      Order #{order.id || order._id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Created at: {orderDate}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
                      {order.paymentMethodType || 'cash'}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        order.isPaid
                          ? 'bg-green-50 text-green-600'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Not Paid'}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        order.isDelivered
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {orderItems.map((item) => {
                    const product = item.product;

                    return (
                      <div
                        key={item._id}
                        className="flex gap-4 rounded-2xl bg-gray-50 p-3"
                      >
                        <Link
                          href={`/products/${product?._id}`}
                          className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                        >
                          {product?.imageCover ? (
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/products/${product?._id}`}
                            className="line-clamp-2 text-sm font-semibold text-gray-950 transition hover:text-(--primary)"
                          >
                            {product?.title || 'Product'}
                          </Link>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity: {item.count}
                          </p>

                          <p className="mt-1 text-sm font-bold text-(--primary)">
                            {item.price} EGP
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-gray-500">
                    <p>
                      City:{' '}
                      <span className="font-semibold text-gray-800">
                        {order.shippingAddress?.city || 'Not provided'}
                      </span>
                    </p>

                    <p className="mt-1">
                      Phone:{' '}
                      <span className="font-semibold text-gray-800">
                        {order.shippingAddress?.phone || 'Not provided'}
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">Total</p>

                    <p className="text-2xl font-bold text-(--primary)">
                      {order.totalOrderPrice} EGP
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;