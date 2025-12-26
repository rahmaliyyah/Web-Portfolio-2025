import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingLaptopProps {
  mousePosition: { x: number; y: number };
}

export const FloatingLaptop = ({ mousePosition }: FloatingLaptopProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth follow mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePosition.x * 0.3,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePosition.y * 0.2 - 0.2,
      0.05
    );
    
    // Floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    
    // Screen glow pulse
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <group 
      ref={groupRef} 
      scale={hovered ? 1.05 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Laptop Base */}
      <RoundedBox args={[3, 0.08, 2]} radius={0.02} position={[0, -0.5, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Keyboard area glow */}
      <mesh position={[0, -0.44, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.2]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      {/* Screen Frame */}
      <group position={[0, 0.5, -0.9]} rotation={[-0.2, 0, 0]}>
        <RoundedBox args={[3, 2, 0.05]} radius={0.02}>
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>
        
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.03]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            color="#0a0a0f"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Code lines on screen */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[-0.8 + Math.random() * 0.3, 0.6 - i * 0.18, 0.04]}>
            <planeGeometry args={[0.8 + Math.random() * 1, 0.04]} />
            <meshBasicMaterial 
              color={['#8b5cf6', '#3b82f6', '#ec4899', '#06b6d4'][i % 4]}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
        
        {/* Screen glow effect */}
        <pointLight 
          position={[0, 0, 0.5]} 
          color="#8b5cf6" 
          intensity={2}
          distance={3}
        />
      </group>
      
      {/* Neon edge glow */}
      <mesh position={[0, 0, -0.9]}>
        <torusGeometry args={[2, 0.01, 8, 50]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
      </mesh>
      
      {/* Floating particles around laptop */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  );
};

const FloatingParticle = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = 0.5 + Math.random() * 0.5;
  const radius = 2 + Math.random() * 1;
  const yOffset = (Math.random() - 0.5) * 2;
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    
    ref.current.position.x = Math.cos(time * speed + index) * radius;
    ref.current.position.z = Math.sin(time * speed + index) * radius;
    ref.current.position.y = yOffset + Math.sin(time * 2 + index) * 0.2;
  });
  
  const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#f97316'];
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02 + Math.random() * 0.02, 8, 8]} />
      <meshBasicMaterial 
        color={colors[index % colors.length]}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};
