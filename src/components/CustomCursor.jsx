import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Use GSAP quickTo for highly optimized rendering
    const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToFollower = gsap.quickTo(followerRef.current, 'x', { duration: 0.5, ease: 'power3' });
    const yToFollower = gsap.quickTo(followerRef.current, 'y', { duration: 0.5, ease: 'power3' });

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      xToCursor(clientX);
      yToCursor(clientY);
      xToFollower(clientX);
      yToFollower(clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Dynamic event delegation for interactive elements (since React components might mount later)
    const handleMouseOver = (e) => {
      const interactiveEl = e.target.closest('a, button, .proj-card, .social-icon, .exp-node');
      if (interactiveEl) {
        gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
        gsap.to(followerRef.current, { scale: 1.5, backgroundColor: 'white', duration: 0.3 });
      }
    };

    const handleMouseOut = (e) => {
      const interactiveEl = e.target.closest('a, button, .proj-card, .social-icon, .exp-node');
      if (interactiveEl) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        gsap.to(followerRef.current, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Hide cursor completely on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Small dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      {/* Trailing ring */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-colors"
      />
    </>
  );
}
