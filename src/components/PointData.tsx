import { useFrame, useThree } from "@react-three/fiber";
import { useController, useXREvent } from "@react-three/xr";
import React, { useState } from "react";
import { BufferGeometry, Mesh, Vector3, Points } from "three";
import LidarArray from "../utils/LidarArray";
import {
  computeBoundsTree,
  disposeBoundsTree,
  acceleratedRaycast,
} from "three-mesh-bvh";

BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;

const lidarArray = new LidarArray();
const pointData = new Float32Array(100000);
let pointIndex = 0;
let lastScan = 0;

export default function PointData({
  environmentRef,
}: {
  environmentRef: React.MutableRefObject<Mesh>;
}) {
  const rightController = useController("right");
  const pointRef = React.useRef<Points>() as React.MutableRefObject<Points>;

  const { scene } = useThree();

  const [scanning, setScanning] = useState(false);

  process.env.NODE_ENV === "development" &&
    lidarArray.getObjects().forEach((obj) => {
      scene.add(obj);
    });

  useFrame((state, delta, xrFrame) => {
    if (!rightController) return;

    const { controller } = rightController;
    const forward = new Vector3(0, 0, -1);
    const right = new Vector3(1, 0, 0);
    const up = new Vector3(0, 1, 0);
    forward.applyQuaternion(controller.quaternion);
    right.applyQuaternion(controller.quaternion);
    up.applyQuaternion(controller.quaternion);
    const position = new Vector3().copy(controller.position);

    // Update the lidar array to match the controller
    lidarArray.setOrigin(position);
    lidarArray.setDirection(forward, right, up);

    lidarArray.intersectObject(environmentRef.current);
  });

  useFrame((state, delta, xrFrame) => {
    if (!scanning) return;
    if (Date.now() - lastScan < 200) return;
    lastScan = Date.now();

    lidarArray.intersectObject(environmentRef.current).forEach((intersects) => {
      if (intersects.length === 0) return;
      if (pointIndex >= pointData.length) pointIndex = 0;

      const { point } = intersects[0];
      const { x, y, z } = point;
      pointData[pointIndex++] = x;
      pointData[pointIndex++] = y;
      pointData[pointIndex++] = z;

      pointRef.current.geometry.attributes.position.needsUpdate = true;
    });
  });

  useXREvent("squeezestart", () => {
    setScanning(true);
  });

  useXREvent("squeezeend", () => {
    setScanning(false);
  });

  return (
    <points ref={pointRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          itemSize={3}
          count={pointData.length / 3}
          array={pointData}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} sizeAttenuation />
    </points>
  );
}
