import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Hero } from '../components/landing/Hero.jsx';
import { Ticker } from '../components/landing/Ticker.jsx';
import { BentoFeatures } from '../components/landing/BentoFeatures.jsx';
import { HowItWorks } from '../components/landing/HowItWorks.jsx';
import { Testimonials } from '../components/landing/Testimonials.jsx';
import { Manifesto } from '../components/landing/Manifesto.jsx';

export function Landing() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Ticker/>
      <BentoFeatures/>
      <HowItWorks/>
      <Testimonials/>
      <Manifesto/>
      <Footer/>
    </>
  );
}