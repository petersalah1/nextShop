import ProductDetails from '@/components/ProductDetails/ProductDetails';

async function ProductDetailsPage({ params }) {
  const { id } = await params;

  return <ProductDetails productId={id} />;
}

export default ProductDetailsPage;