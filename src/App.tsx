import React, { useEffect } from "react";
import { XR, VRButton, Controllers } from "@react-three/xr";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Sheet, useColorScheme } from "@mui/joy";
import Terrain from "./components/Terrain";
import PointData from "./components/PointData";

export default function App() {
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode("system");
  }, [setMode]);

  return (
    <Sheet
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
      }}
    >
      <VRButton />
      <Canvas shadows style={{ zIndex: 0 }}>
        <XR>
          <Controllers />
          <Environment preset="city" />
          <Terrain />
          <PointData />
          <group position={[0, 0.1, 0]}>
            <Grid
              position={[0, 0, 0]}
              renderOrder={-1}
              args={[40, 40]}
              cellSize={0.5}
              sectionSize={4}
              cellThickness={1}
              cellColor="#67696b"
              sectionThickness={1.5}
              sectionColor="#717f8e"
              fadeDistance={30}
              fadeStrength={1}
              followCamera
              infiniteGrid
            />
          </group>
        </XR>
        <ambientLight intensity={0.1} />
        {/* <ContactShadows position={[0, 0, 0]} scale={20} blur={2} far={4.5} /> */}
        <OrbitControls />
      </Canvas>
    </Sheet>
  );
}
