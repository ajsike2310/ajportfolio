import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import FeaturedProject from './components/FeaturedProject';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Socials from './components/Socials';
import Contact from './components/Contact';
import Background from './components/Background';
import Scene3D from './components/Scene3D';
import ThemeToggle from './components/ThemeToggle';
import Marquee from './components/Marquee';
import Preloader from './components/Preloader';
import { useContent } from './ContentContext';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { loading } = useContent();

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="min-h-screen text-black dark:text-white relative">
      <Preloader isLoading={loading} />
      <ThemeToggle />
      <Background />
      <Scene3D />
      <Hero instanceId="hero" />
      <Marquee instanceId="marquee" />
      <About instanceId="about" />
      <Experience instanceId="experience" />
      <FeaturedProject instanceId="featured" />
      <Projects instanceId="projects" />
      <Testimonials instanceId="testimonials" />
      <Socials instanceId="socials" />
      <Contact />
    </div>
  );
}

export default App;
