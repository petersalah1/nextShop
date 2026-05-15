import Link from 'next/link';

function CategoryHero({ category, results }) {
  return (
    <div
      className="relative mb-10 overflow-hidden rounded-[32px] bg-gray-950 px-6 py-14 text-white sm:px-10 sm:py-16"
      style={{
        backgroundImage: category?.image ? `url(${category.image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/65 to-gray-950/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />

      <div className="relative max-w-2xl">
        <Link
          href="/categories"
          className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-gray-950"
        >
          Back to categories
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
          Category
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          {category?.name || 'Category Products'}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-200 sm:text-base">
          Browse all products available in this category and discover the best
          deals selected for you.
        </p>

        <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
          {results} products found
        </div>
      </div>
    </div>
  );
}

export default CategoryHero;