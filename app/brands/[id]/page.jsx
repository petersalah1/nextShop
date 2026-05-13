async function BrandDetailsPage({ params }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-950">Brand Details</h1>
        <p className="mt-3 text-gray-500">This page is ready for implementation.</p>
        <p className="mt-2 text-sm text-gray-400">brandId: {id}</p>
      </section>
    </main>
  );
}

export default BrandDetailsPage;
