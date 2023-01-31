import React, { Suspense, useEffect, useState } from "react";
import limboFrag from "../shaders/limbo.frag";
import limboVert from "../shaders/limbo.vert";

export default function Terrain({
  center = [0, 0, 0],
  size = [1024, 1024, 1024],
}: {
  center?: [number, number, number];
  size?: [number, number, number];
}) {
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

  return (
    <Suspense fallback={null}>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1 / 1024, 1 / 1024, 1 / 1024]}
      >
        <planeBufferGeometry args={[1024, 1024, 256, 256]} />
        <shaderMaterial
          uniforms={{
            // Feed the scaling constant for the heightmap
            bumpScale: { value: 50 },
          }}
          // Feed the shaders as strings
          vertexShader={shaders?.vert}
          fragmentShader={shaders?.frag}
        />
      </mesh>
    </Suspense>
  );
}
