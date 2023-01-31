import React, { useEffect } from "react";
import { XR, VRButton, Controllers } from "@react-three/xr";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Sheet, useColorScheme } from "@mui/joy";
import Terrain from "./components/Terrain";

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
          <group position={[0, 0, 0]}>
            <Grid
              position={[0, -0.05, 0]}
              renderOrder={-1}
              args={[40, 40]}
              cellSize={0.5}
              cellThickness={1}
              cellColor="#6b6767"
              sectionSize={4}
              sectionThickness={1.5}
              sectionColor="#b13c69"
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
