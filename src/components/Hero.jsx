import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';
import { useContent } from '../ContentContext';

export default function Hero({ instanceId }) {
  const comp = useRef(null);
  const photoRef = useRef(null);
  const { data, loading } = useContent();
  const [animReady, setAnimReady] = useState(false);

  // Wait for preloader to fade out before triggering title animations
  useEffect(() => {
    if (!loading) {
      // 1.3s = 0.5s settle + ~0.8s fade out of preloader
      const t = setTimeout(() => setAnimReady(true), 1300);
      return () => clearTimeout(t);
    }
  }, [loading]);

  useLayoutEffect(() => {
    if (!animReady) return;
    let ctx = gsap.context(() => {
      gsap.from(photoRef.current, {
        yPercent: 15,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.1,
      });

      gsap.to(photoRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, comp);

    return () => ctx.revert();
  }, [animReady]);

  const hero = data?.content?.[instanceId] || data?.content?.hero;
  if (!hero) return null;

  return (
    <section ref={comp} className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6">
      
      {/* Floating Image - behind text on mobile, side on desktop */}
      <div
        ref={photoRef}
        className="absolute right-0 bottom-0 w-48 sm:w-64 md:right-10 md:-bottom-10 md:w-[32rem] z-0 pointer-events-none opacity-60 dark:opacity-80"
        style={{ animation: 'photoFloat 6s ease-in-out infinite' }}
      >
        <img src="/Avin_transparent.png" alt="Avin Joy" className="w-full h-auto object-contain" />
        <style dangerouslySetInnerHTML={{ __html: '@keyframes photoFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-16px)} }' }} />
      </div>

      <div className="z-10 mix-blend-difference w-full max-w-4xl mx-auto">
        {/* Name */}
        {hero.name && (
          <p className="font-mono text-gray-400 uppercase tracking-[0.3em] text-xs sm:text-sm mb-3 font-body">{hero.name}</p>
        )}
        <h1 className="font-black tracking-tighter leading-[1.1] md:leading-tight">
          <span id="title-1" className="block text-white overflow-hidden uppercase text-3d" style={{fontSize:'clamp(1.8rem, 6vw, 4.5rem)'}}><SplitText text={hero.title1} delay={animReady ? 0.1 : 99} /></span>
          <span id="title-2" className="block text-gray-300 overflow-hidden uppercase text-3d" style={{fontSize:'clamp(1.8rem, 6vw, 4.5rem)'}}><SplitText text={hero.title2} delay={animReady ? 0.3 : 99} /></span>
          <span id="title-3" className="block text-white font-signature mt-2 tracking-normal overflow-hidden text-3d" style={{fontSize:'clamp(1.5rem, 5vw, 4.5rem)'}}><SplitText text={hero.title3} delay={animReady ? 0.5 : 99} /></span>
        </h1>
        <p id="subtitle" className="mt-6 text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-light px-4 break-words font-body">
          <SplitText text={hero.subtitle} delay={animReady ? 0.8 : 99} />
        </p>
        
        {/* Resume Button */}
        <div className={`mt-8 transition-all duration-1000 ease-out flex justify-center ${animReady ? 'opacity-100 translate-y-0 delay-[1200ms]' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="/Avin_Joy_Resume.pdf" 
            download
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            <span>Download Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
