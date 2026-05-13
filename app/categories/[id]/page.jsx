import CategoryProducts from '@/components/Categories/CategoryProducts';

async function CategoryDetailsPage({ params }) {
  const { id } = await params;

  return <CategoryProducts categoryId={id} />;
}

export default CategoryDetailsPage;