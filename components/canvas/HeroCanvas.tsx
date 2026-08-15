"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientDust() {
  const count = 500;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30, // x spread
          (Math.random() - 0.5) * 20, // y spread
          (Math.random() - 0.5) * 20 - 5 // z spread, pushed slightly back
        ),
        factor: Math.random() * 0.5 + 0.1, // speed factor
        speed: Math.random() * 0.005 + 0.001,
        xAmplitude: Math.random() * 2,
        yAmplitude: Math.random() * 2,
        initialOffset: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.05 + 0.01 // very small size for dust
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      // Drift slowly upwards and wobble
      const currentY = p.position.y + (time * p.speed * 10);
      // Wrap around Y so they continuously float up
      const wrappedY = ((currentY + 10) % 20) - 10;
      
      dummy.position.set(
        p.position.x + Math.sin(time * p.factor + p.initialOffset) * p.xAmplitude,
        wrappedY,
        p.position.z + Math.cos(time * p.factor + p.initialOffset) * p.yAmplitude
      );
      dummy.scale.setScalar(p.scale);
      dummy.rotation.set(time * p.factor, time * p.factor, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#ffffff" 
        roughness={0.8} 
        transparent 
        opacity={0.15} 
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px" } 
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#E90302" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
          
          <AmbientDust />
        </Canvas>
      )}
    </div>
  );
}
