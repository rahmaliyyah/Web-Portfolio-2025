import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

interface IntroAnimationProps {
  onComplete: () => void;
}

const ExplodingParticles = ({ onComplete }: { onComplete: () => void }) => {
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!pointsRef.current) return;

    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorPalette = [
      new THREE.Color('#3b82f6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#f97316'),
      new THREE.Color('#06b6d4'),
    ];

    // Start all particles at center
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Explosion animation
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 800);
      }
    });

    // Explode particles outward - SLOWER & MORE DRAMATIC
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const targetX = radius * Math.sin(phi) * Math.cos(theta);
      const targetY = radius * Math.sin(phi) * Math.sin(theta);
      const targetZ = radius * Math.cos(phi);

      tl.to(positions, {
        [i3]: targetX,
        [i3 + 1]: targetY,
        [i3 + 2]: targetZ,
        duration: 3.5, // Increased from 2 to 3.5 seconds
        ease: 'power2.out', // Changed to softer ease
        onUpdate: () => {
          if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
          }
        }
      }, 0);
    }

    // Fade out - SMOOTHER
    tl.to(pointsRef.current.material, {
      opacity: 0,
      duration: 1.5, // Increased from 1 to 1.5
      ease: 'power2.inOut' // Smoother ease
    }, 2.5); // Start fade earlier for smoother transition

  }, [onComplete]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Fade out entire intro
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      delay: 2.5,
      ease: 'power2.inOut',
      onComplete
    });
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Stars 
          radius={100} 
          depth={50} 
          count={2000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        <ExplodingParticles onComplete={() => {}} />
      </Canvas>
    </div>
  );
};