import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function RollingSphere({ isDark }) {
  const meshRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create a timeline linked to the scroll of the entire document
      gsap.to(meshRef.current.position, {
        y: -10, // Moves down slightly over the whole page
        x: 4,   // Rolls to the right
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
      
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 4,
        z: -Math.PI * 2,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // Continuous idle rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[-2, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.8}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color={isDark ? "#ffffff" : "#cccccc"}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  const [isDark, setIsDark] = useState(true);

  // Monitor theme changes for lighting adjustments
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={isDark ? 1 : 2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color={isDark ? "#ffffff" : "#444444"} />
        <directionalLight position={[-10, -10, 5]} intensity={1} color={isDark ? "#aaaaaa" : "#333333"} />
        <directionalLight position={[0, 10, -5]} intensity={2} color={isDark ? "#ffffff" : "#444444"} />
        
        <Environment preset="city" />
        
        <RollingSphere isDark={isDark} />
      </Canvas>
    </div>
  );
}
