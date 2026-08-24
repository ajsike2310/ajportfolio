import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({ instanceId }) {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { data } = useContent();

  const testimonials = data?.content?.[instanceId]?.list || data?.content?.testimonials?.list;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".test-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    if (!testimonials) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials) return null;

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-20 min-h-[70vh] flex flex-col justify-center relative bg-transparent pointer-events-none mix-blend-difference">
      <div className="max-w-4xl mx-auto text-center test-content pointer-events-auto">
        <div className="text-6xl text-white opacity-20 mb-6 font-serif">"</div>
        
        <div className="relative mb-12 grid grid-cols-1 place-items-center w-full px-4">
          {testimonials.map((test, i) => (
            <div 
              key={i}
              className={`col-start-1 row-start-1 w-full transition-all duration-1000 ease-in-out ${i === activeIdx ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-10 z-0 pointer-events-none'}`}
            >
              <p className="text-xl md:text-3xl text-white font-medium leading-relaxed mb-8">
                {test.quote}
              </p>
              <p className="text-white font-bold tracking-wider uppercase text-sm">
                {test.name}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4">
          {testimonials.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-12 h-1 transition-all duration-300 ${i === activeIdx ? 'bg-white' : 'bg-white/20 hover:bg-white/50'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
