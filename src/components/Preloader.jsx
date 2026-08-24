import React, { useState, useEffect } from 'react';

export default function Preloader({ isLoading }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let fadeTimer = null;

    const doFade = () => {
      setVisible(false);
      fadeTimer = setTimeout(() => setMounted(false), 1100);
    };

    // Hard 4s cap - always dismisses
    const hardCap = setTimeout(doFade, 4000);

    // Also fade as soon as data is ready
    if (!isLoading) {
      clearTimeout(hardCap);
      setTimeout(doFade, 400);
    }

    return () => {
      clearTimeout(hardCap);
      clearTimeout(fadeTimer);
    };
  }, [isLoading]);

  if (!mounted) return null;

  const containerStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999999,
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    opacity: visible ? 1 : 0,
    transition: 'opacity 1s ease',
    pointerEvents: visible ? 'all' : 'none',
  };

  const dotBase = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#fff',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ ...dotBase, animation: 'blink 1.2s ease-in-out 0s infinite' }} />
        <div style={{ ...dotBase, animation: 'blink 1.2s ease-in-out 0.2s infinite' }} />
        <div style={{ ...dotBase, animation: 'blink 1.2s ease-in-out 0.4s infinite' }} />
        <style dangerouslySetInnerHTML={{ __html: '@keyframes blink { 0%,100%{opacity:0.1} 50%{opacity:1} }' }} />
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        Loading
      </div>
    </div>
  );
}
