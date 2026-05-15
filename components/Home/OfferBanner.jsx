import Link from 'next/link';

function OfferBanner() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-gray-950 px-6 py-12 text-white sm:px-10 lg:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Limited Time Offer
              </span>

              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Get the best deals on selected products.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Explore our latest offers and discover products with special
                discounts for a limited time.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/products"
                className="rounded-full bg-(--primary) px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-gray-950"
              >
                Shop Offers
              </Link>

              <Link
                href="/categories"
                className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-gray-950"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferBanner;