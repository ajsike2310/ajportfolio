import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function SplitText({ text, delay = 0 }) {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".char", {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: delay,
      });
    }, container);
    return () => ctx.revert();
  }, [delay]);

  return (
    <span ref={container} className="inline-block" style={{ perspective: '400px' }}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
