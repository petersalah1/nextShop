import BrandProduct from '@/components/Brands/BrandProduct';

async function BrandDetailsPage({ params }) {
  const { id } = await params;

  return <BrandProduct brandId={id} />;
}

export default BrandDetailsPage;
