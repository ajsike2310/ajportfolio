import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../ContentContext';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="proj-card group p-8 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 relative overflow-hidden transition-all duration-300 cursor-default hover:shadow-2xl"
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)'
        }}
      />
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 border border-black/20 dark:border-white/20"
        style={{
          maskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)',
          WebkitMaskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)'
        }}
      />
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h3 className="text-2xl font-bold text-black dark:text-white pr-4">{project.title}</h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 pointer-events-auto"
            title="View on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>
        )}
      </div>
      <p className="text-black dark:text-gray-400 mb-6 relative z-10 font-body">{project.desc}</p>
      <p className="text-sm font-mono text-black dark:text-gray-500 relative z-10 font-body">{project.tech}</p>
    </div>
  );
}

export default function Projects({ instanceId }) {
  const containerRef = useRef(null);
  const { data } = useContent();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projects = data?.content?.[instanceId]?.list || data?.content?.projects?.list;
  if (!projects || !Array.isArray(projects)) return null;

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-20 bg-white dark:bg-black relative z-10">
      <h2 className="text-4xl font-bold mb-16 text-black dark:text-white">Other Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}
