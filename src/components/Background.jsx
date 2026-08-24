import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Background() {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const circles = gsap.utils.toArray(".anim-circle");
      
      circles.forEach((circle) => {
        gsap.to(circle, {
          x: "random(-400, 400)",
          y: "random(-400, 400)",
          duration: "random(10, 20)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-white dark:bg-black">
      {/* Soft overlay to blend circles */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[100px] z-10"></div>
      
      {/* Animated glowing orbs in monochrome (support light/dark) */}
      <div className="anim-circle absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-black/10 dark:bg-white/10 mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
      <div className="anim-circle absolute top-[60%] left-[60%] w-[500px] h-[500px] rounded-full bg-zinc-400/20 dark:bg-zinc-600/20 mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
      <div className="anim-circle absolute top-[30%] left-[80%] w-[350px] h-[350px] rounded-full bg-gray-500/10 dark:bg-gray-500/10 mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
      <div className="anim-circle absolute top-[80%] left-[10%] w-[450px] h-[450px] rounded-full bg-zinc-600/10 dark:bg-zinc-400/10 mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
      <div className="anim-circle absolute top-[50%] left-[40%] w-[300px] h-[300px] rounded-full bg-black/5 dark:bg-white/5 mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"></div>
    </div>
  );
}
