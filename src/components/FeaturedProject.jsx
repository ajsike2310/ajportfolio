import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject({ instanceId }) {
  const containerRef = useRef(null);
  const { data } = useContent();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feat-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".feat-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const featured = data?.content?.featured;
  if (!featured) return null;

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-20 min-h-screen relative flex items-center bg-gray-50 dark:bg-[#0a0a0a] z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Content Side */}
        <div className="feat-content order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-black dark:bg-white"></div>
            <h3 className="text-black dark:text-gray-400 font-mono tracking-widest uppercase text-sm">{featured.tag}</h3>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-6 leading-tight">
            {featured.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i < featured.title.split(' ').length - 1 && <br/>}
              </React.Fragment>
            ))}
          </h2>
          
          <p className="text-base md:text-lg text-black dark:text-gray-400 mb-8 leading-relaxed font-light font-body">
            {featured.desc}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {featured.tech.map((t, i) => (
              <span key={i} className="px-4 py-2 border border-black/20 dark:border-white/20 rounded-full text-sm font-mono text-black dark:text-gray-300">{t}</span>
            ))}
          </div>
          
          {featured.link ? (
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-black dark:text-white font-bold tracking-wider uppercase text-sm hover:opacity-70 transition-opacity"
            >
              View on GitHub
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
          ) : (
            <button className="group flex items-center gap-4 text-black dark:text-white font-bold tracking-wider uppercase text-sm hover:opacity-70 transition-opacity">
              View Case Study
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          )}
        </div>

        {/* Image Side */}
        <div className="feat-image order-1 lg:order-2 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/5">
            {featured.image ? (
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                {/* Placeholder abstract geometry */}
                <div className="w-3/4 h-3/4 rounded-full border border-black dark:border-white animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                <div className="absolute w-1/2 h-1/2 rounded-full border border-black dark:border-white animate-spin-reverse-slow" style={{ animationDuration: '15s' }}></div>
              </div>
            )}
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white dark:bg-black rounded-full mix-blend-difference filter blur-2xl opacity-50"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-black dark:bg-white rounded-full mix-blend-difference filter blur-2xl opacity-50"></div>
        </div>

      </div>
    </section>
  );
}
