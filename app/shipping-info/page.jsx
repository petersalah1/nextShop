function ShippingInfoPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-(--primary)">Support</span>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">
          Shipping Info
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          NextShop provides fast and reliable shipping for all eligible orders.
          Delivery time may vary depending on product availability and customer
          location.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="font-bold text-gray-950">Processing</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Orders are usually processed within 1-2 business days.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="font-bold text-gray-950">Delivery</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Delivery usually takes 3-7 business days depending on the city.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="font-bold text-gray-950">Tracking</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Order status can be followed from the orders page after login.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingInfoPage;