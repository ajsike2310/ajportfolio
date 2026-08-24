import React from 'react';

export default function Contact() {
  return (
    <footer className="py-16 px-6 text-center bg-gradient-to-t from-gray-200 dark:from-zinc-900 to-white dark:to-black relative z-10">
      <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-black dark:text-white">
        Let's Work Together
      </h2>
      <p className="text-base md:text-xl text-black dark:text-gray-400 mb-10">Currently open for new opportunities.</p>
      
      <a href="https://wa.me/917306567797?text=Hi%20Avin!%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect." target="_blank" rel="noopener noreferrer" className="inline-block px-8 md:px-12 py-3 md:py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-base md:text-xl hover:scale-105 transition-transform mb-16">
        Say Hello
      </a>

      <div className="text-black dark:text-gray-600 text-xs md:text-sm font-mono">
        © 2026 All rights reserved.
      </div>
    </footer>
  );
}
