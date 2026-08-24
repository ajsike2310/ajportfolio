import React from 'react';
import { useContent } from '../ContentContext';

export default function Marquee({ instanceId }) {
  const { data } = useContent();
  const words = data?.content?.[instanceId]?.words || data?.content?.marquee?.words || [];

  if (!words.length) return null;

  return (
    <div className="w-full bg-transparent py-4 overflow-hidden relative flex whitespace-nowrap mix-blend-difference">
      <div className="animate-marquee flex gap-8 items-center text-white">
        {words.map((word, i) => (
          <span key={i} className="text-xl md:text-2xl font-bold tracking-widest">{word}</span>
        ))}
        {/* Duplicate for seamless infinite scrolling */}
        {words.map((word, i) => (
          <span key={`dup-${i}`} className="text-xl md:text-2xl font-bold tracking-widest">{word}</span>
        ))}
      </div>
    </div>
  );
}
