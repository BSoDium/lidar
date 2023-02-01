import React, { useEffect, useState, useRef } from "react";
import limboFrag from "../shaders/terrain.frag";
import limboVert from "../shaders/terrain.vert";
import { useFrame } from "@react-three/fiber";

export default function Terrain() {
  const shaderRef = useRef() as React.MutableRefObject<any>;
  const meshRef = useRef() as React.MutableRefObject<any>;

  const [shaders, setShaders] = useState<{
    vert: string;
    frag: string;
  }>();

  useEffect(() => {
    Promise.all([fetch(limboVert), fetch(limboFrag)])
      .then((responses) => Promise.all(responses.map((r) => r.text())))
      .then((values) => {
        setShaders({
          vert: values[0],
          frag: values[1],
        });
      });
  }, []);

  useFrame(({ clock, camera }) => {
    const { x, z } = camera.position;

    if (shaders) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime() * 0.05;
      meshRef.current.position.set(x, 0, z);
    }
  });

  return shaders ? (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.3, 0.3, 0.3]}
    >
      <planeGeometry args={[1024, 1024, 256, 256]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          time: { value: 0.0 },
          amplitude: { value: 20.0 },
        }}
        // Feed the shaders as strings
        vertexShader={shaders?.vert}
        fragmentShader={shaders?.frag}
      />
    </mesh>
  ) : null;
}
