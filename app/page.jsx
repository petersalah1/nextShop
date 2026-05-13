import Brands from '@/components/Brands/Brands';
import Hero from '@/components/Hero/Hero';
import FeaturedProducts from '@/components/Products/FeaturedProducts';

export default function Home() {
  
  return (
    <section>
      <Hero />
      <FeaturedProducts />
      <Brands />
    </section>
  );
}
