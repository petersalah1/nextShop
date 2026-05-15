import FeaturedBrands from '@/components/Brands/FeaturedBrands';
import FeaturedCategories from '@/components/Categories/FeaturedCategories';
import Hero from '@/components/Hero/Hero';
import OfferBanner from '@/components/Home/OfferBanner';
import FeaturedProducts from '@/components/Products/FeaturedProducts';

export default function Home() {
  
  return (
    <section>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <FeaturedBrands />
      <OfferBanner />
    </section>
  );
}
