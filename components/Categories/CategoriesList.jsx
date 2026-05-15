'use client';
import { useCategories } from '@/hooks/queries/useCategories';
import Link from 'next/link';
import PageHeader from '../shared/PageHeader';

function CategoriesList() {
  const { data: categories, isError, isLoading } = useCategories();
  if (isLoading) {
    return <h1>Loading categories...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong.</h1>;
  }

  return (
    <>
      <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <PageHeader label="Shop by Category" title="Categories" description="Explore our main product categories and find what you need faster." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories?.map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-950">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default CategoriesList;
