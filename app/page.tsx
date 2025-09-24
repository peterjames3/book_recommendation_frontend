import Hero from '@/app/ui/components/home/hero/hero-main'
import AboutLitKenya from '@/app/ui/components/home/about/about-litkenya'
import Discover from '@/app/ui/components/home/discover/discover';
import MoodMain from './ui/components/home/mood/mood-main';
import SuccessPath from './ui/components/home/path/success-path';

export default function Home() {
  return (
   <main>
    <Hero />
    <AboutLitKenya />
    <Discover />
    <MoodMain />
    <SuccessPath />
   </main>
  );
}
