import Link from 'next/link';

function BrandHeader({ brand, results }) {
  return (
    <div className="mb-10 overflow-hidden rounded-[32px] border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <Link
            href="/brands"
            className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-(--primary) hover:text-(--primary)"
          >
            Back to brands
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-(--primary)">
            Brand
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            {brand?.name || 'Brand Products'}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore all available products from this brand and discover the best
            offers.
          </p>

          <div className="mt-6 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            {results} products found
          </div>
        </div>

        <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:h-44 sm:w-44">
          {brand?.image ? (
            <img
              src={brand.image}
              alt={brand.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-4xl font-black text-gray-200">
              {brand?.name?.charAt(0) || 'B'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrandHeader;