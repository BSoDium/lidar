import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Dummy() {
  const { nodes } = useGLTF("/models/Human.glb") as any;
  return (
    <group dispose={null} scale={0.09} rotation={[0, Math.PI, 0]}>
      <mesh geometry={nodes.Group1.geometry} material={nodes.Group1.material} />
    </group>
  );
}
