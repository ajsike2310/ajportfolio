import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function About({ instanceId }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const { data } = useContent();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const about = data?.content?.[instanceId] || data?.content?.about;
  if (!about) return null;

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-20 min-h-screen flex items-center relative">
      <div className="max-w-4xl mx-auto mix-blend-difference relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white about-text">{about.heading}</h2>
        <p className="text-lg md:text-2xl lg:text-4xl leading-snug font-medium text-gray-200 about-text mb-6 font-body">
          {about.text1}
        </p>
        <p className="text-base md:text-xl lg:text-2xl text-gray-400 font-light about-text font-body">
          {about.text2}
        </p>
      </div>
    </section>
  );
}
