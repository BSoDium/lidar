import { Point, PointMaterial, Points } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useController } from "@react-three/xr";
import React, { useMemo } from "react";
import { Vector3 } from "three";
import * as THREE from "three";

let data: number[][] = [];
const raycaster = new THREE.Raycaster();
const arrowHelper = new THREE.ArrowHelper(
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(0, 0, 0),
  5,
  0xff0000
);

export default function PointData({
  environmentRef,
}: {
  environmentRef: React.MutableRefObject<THREE.Mesh>;
}) {
  const rightController = useController("right");
  const ref =
    React.useRef<THREE.Points>() as React.MutableRefObject<THREE.Points>;

  const { scene } = useThree();

  scene.add(arrowHelper);

  useFrame(() => {
    if (!rightController) return;

    const { controller } = rightController;
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(controller.quaternion);
    const position = new THREE.Vector3().copy(controller.position);

    // Cast a ray from the controller to the mesh and get the intersection point
    raycaster.ray.origin.copy(position);
    raycaster.ray.direction.copy(forward);

    arrowHelper.position.copy(position);
    arrowHelper.setDirection(forward);
    arrowHelper.setLength(5);
    arrowHelper.setColor(new THREE.Color(0xff0000));

    const intersects = raycaster.intersectObject(environmentRef.current);

    if (intersects.length > 0) {
      const { x, y, z } = intersects[0].point;
      if (data.length > 1000) data.shift();
      data.push([x, y, z]);

      arrowHelper.setLength(intersects[0].distance);
      arrowHelper.setColor(new THREE.Color(0x00ff00));

      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <PointMaterial size={0.01} sizeAttenuation={false} />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={data.length}
          array={new Float32Array(data.flat())}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}
