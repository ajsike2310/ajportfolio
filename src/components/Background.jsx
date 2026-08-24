import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-zinc-50 dark:bg-[#050505]">
      {/* Minimalist dot grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(150,150,150,0.2) 1.5px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      ></div>
      
      {/* Subtle vignette mask so the dots fade out near the edges nicely */}
      <div className="absolute inset-0 bg-zinc-50/40 dark:bg-[#050505]/60 [mask-image:radial-gradient(circle_at_center,transparent_20%,black_100%)]"></div>
    </div>
  );
}
