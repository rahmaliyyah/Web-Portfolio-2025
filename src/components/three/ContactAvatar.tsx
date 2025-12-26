import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactAvatarProps {
  mousePosition: { x: number; y: number };
}

export const ContactAvatar = ({ mousePosition }: ContactAvatarProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0, bodyX: 0, bodyY: 0 });
  const breathingPhase = useRef(0);

  // Smooth cursor following for entire body with damping
  useFrame((state, delta) => {
    if (!groupRef.current || !headRef.current) return;

    // Update breathing animation
    breathingPhase.current += delta * 2;
    const breathOffset = Math.sin(breathingPhase.current) * 0.02;

    // Calculate target rotations based on mouse position
    // Body follows with less intensity, head follows more
    targetRotation.current.bodyY = mousePosition.x * 0.15;
    targetRotation.current.bodyX = mousePosition.y * 0.08;
    targetRotation.current.y = mousePosition.x * 0.4;
    targetRotation.current.x = -mousePosition.y * 0.25;

    // Smooth body rotation with damping
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.bodyY,
      delta * 2
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.bodyX + breathOffset,
      delta * 2
    );

    // Subtle body lean toward cursor
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mousePosition.x * 0.1,
      delta * 3
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mousePosition.y * 0.05 + breathOffset * 2,
      delta * 3
    );

    // Head follows cursor more intensely
    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      targetRotation.current.y - targetRotation.current.bodyY,
      delta * 4
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      targetRotation.current.x - targetRotation.current.bodyX,
      delta * 4
    );

    // Subtle head tilt
    headRef.current.rotation.z = THREE.MathUtils.lerp(
      headRef.current.rotation.z,
      -mousePosition.x * 0.1,
      delta * 3
    );
  });

  // Create hijab geometry
  const hijabGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Elegant hijab silhouette
    shape.moveTo(0, 0.5);
    shape.bezierCurveTo(0.6, 0.5, 0.8, 0.2, 0.7, -0.3);
    shape.bezierCurveTo(0.6, -0.8, 0.3, -1.2, 0, -1.3);
    shape.bezierCurveTo(-0.3, -1.2, -0.6, -0.8, -0.7, -0.3);
    shape.bezierCurveTo(-0.8, 0.2, -0.6, 0.5, 0, 0.5);
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.03,
      bevelSegments: 8,
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 3]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[-2, 1, 2]} intensity={0.5} color="#ec4899" />
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#06b6d4" />

      {/* Body/Torso */}
      <group position={[0, -0.8, 0]}>
        {/* Main torso */}
        <mesh>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        
        {/* Tech accessory - glowing wrist display */}
        <group position={[0.55, 0.2, 0.1]}>
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.15, 0.25, 0.05]} />
            <meshStandardMaterial 
              color="#0f0f1a"
              emissive="#8b5cf6"
              emissiveIntensity={0.5}
              roughness={0.3}
            />
          </mesh>
          {/* Holographic display */}
          <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 6]}>
            <planeGeometry args={[0.12, 0.2]} />
            <meshBasicMaterial 
              color="#06b6d4"
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>

        {/* Shoulders */}
        <mesh position={[0.5, 0.4, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
        </mesh>
        <mesh position={[-0.5, 0.4, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
        </mesh>
      </group>

      {/* Head group - follows cursor more */}
      <group ref={headRef} position={[0, 0.3, 0]}>
        {/* Face */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color="#d4a574"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Hijab */}
        <mesh geometry={hijabGeometry} position={[0, 0.15, -0.1]} rotation={[0.1, 0, 0]}>
          <meshStandardMaterial 
            color="#1e1e3f"
            roughness={0.5}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Hijab neon edge glow */}
        <mesh position={[0, 0.15, -0.05]} scale={[1.02, 1.02, 1.02]}>
          <torusGeometry args={[0.4, 0.02, 8, 32]} />
          <meshBasicMaterial 
            color="#8b5cf6"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Futuristic glasses */}
        <group position={[0, 0.05, 0.35]}>
          {/* Glasses frame */}
          <mesh>
            <boxGeometry args={[0.5, 0.08, 0.02]} />
            <meshStandardMaterial 
              color="#0f0f1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Left lens */}
          <mesh position={[-0.13, 0, 0.02]}>
            <boxGeometry args={[0.16, 0.1, 0.01]} />
            <meshStandardMaterial 
              color="#06b6d4"
              transparent
              opacity={0.6}
              emissive="#06b6d4"
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Right lens */}
          <mesh position={[0.13, 0, 0.02]}>
            <boxGeometry args={[0.16, 0.1, 0.01]} />
            <meshStandardMaterial 
              color="#8b5cf6"
              transparent
              opacity={0.6}
              emissive="#8b5cf6"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>

        {/* Eyes (behind glasses) */}
        <group position={[0, 0.05, 0.33]}>
          {/* Left eye */}
          <mesh position={[-0.1, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>
          {/* Right eye */}
          <mesh position={[0.1, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>
          {/* Eye highlights */}
          <mesh position={[-0.08, 0.01, 0.02]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.12, 0.01, 0.02]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Subtle smile */}
        <mesh position={[0, -0.1, 0.34]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#b8846a" />
        </mesh>

        {/* Glowing earbuds */}
        <mesh position={[0.38, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[-0.38, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            emissive="#ec4899"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Particle aura around avatar */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * Math.PI / 6) * 1.2,
            Math.cos(i * Math.PI / 6) * 0.8 - 0.3,
            Math.sin(i * Math.PI / 3) * 0.3
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? '#8b5cf6' : '#ec4899'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};
