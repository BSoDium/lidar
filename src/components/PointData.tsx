import { Point, PointMaterial, Points } from "@react-three/drei";
import React, { useMemo } from "react";
import { Vector3 } from "three";

export default function PointData({ count = 1000 }: { count?: number }) {
  const vertices = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < count; i++) {
      vertices.push([
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
      ]);
    }
    return vertices;
  }, [count]);

  return (
    <Points limit={vertices.length}>
      <PointMaterial
        transparent
        vertexColors
        size={5}
        sizeAttenuation={false}
        depthWrite={false}
      />
      {vertices.map((vertex, i) => (
        <Point
          key={i}
          color={`hsl(${Math.random() * 100 + 150}, 100%, 50%)`}
          position={new Vector3(vertex[0], vertex[1], vertex[2])}
        />
      ))}
    </Points>
  );
}
