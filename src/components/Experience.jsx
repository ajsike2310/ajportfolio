import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ instanceId }) {
  const containerRef = useRef(null);
  const { data } = useContent();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".exp-node", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".exp-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 2,
        ease: "power3.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const experience = data?.content?.[instanceId]?.jobs || data?.content?.experience?.jobs;
  if (!experience || !Array.isArray(experience)) return null;

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-20 min-h-screen relative">
      <div className="mix-blend-difference relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white text-center">Experience</h2>
      
        <div className="max-w-4xl mx-auto relative">
          <div className="exp-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/30"></div>
          
          <div className="flex flex-col gap-12">
            {experience.map((job, i) => (
              <div key={i} className={`exp-node relative flex items-center justify-between md:justify-normal group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-[5px] group-hover:scale-150 transition-transform"></div>
                
                <div className="w-full md:w-5/12 pl-10 md:pl-0">
                  <div className={`p-6 rounded-xl border border-white/20 bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-colors ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-gray-400 font-mono text-sm block mb-2">{job.period}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{job.role}</h3>
                    <h4 className="text-lg text-gray-300 mb-4">{job.company}</h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-body">
                      {job.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
