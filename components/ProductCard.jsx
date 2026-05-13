import Link from 'next/link';

function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageCover}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-gray-400">
          {product.category?.name}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold text-gray-950">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-bold text-(--primary)">
            {product.price} EGP
          </p>

          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
            ⭐ {product.ratingsAverage}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;