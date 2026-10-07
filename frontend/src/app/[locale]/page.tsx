import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Packages from '@/components/home/Packages';
import Destinations from '@/components/home/Destinations';
import WhyChoose from '@/components/home/WhyChoose';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Packages />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
