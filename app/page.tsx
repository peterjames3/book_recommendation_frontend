import Hero from '@/app/ui/components/home/hero/hero-main'
import AboutLitKenya from '@/app/ui/components/home/about/about-litkenya'
import Discover from '@/app/ui/components/home/discover/discover';

export default function Home() {
  return (
   <main>
    <Hero />
    <AboutLitKenya />
    <Discover />
   </main>
  );
}
