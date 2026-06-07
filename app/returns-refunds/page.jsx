function ReturnsRefundsPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-(--primary)">Support</span>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">
          Returns & Refunds
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          We want you to be satisfied with your shopping experience. If there is
          an issue with your order, you can contact support for return or refund
          assistance.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="font-bold text-gray-950">Return Window</h2>
            <p className="mt-2 leading-7 text-gray-600">
              Products may be eligible for return within 14 days if they are in
              their original condition.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="font-bold text-gray-950">Refund Processing</h2>
            <p className="mt-2 leading-7 text-gray-600">
              Refunds are reviewed after the returned product is received and
              inspected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReturnsRefundsPage;