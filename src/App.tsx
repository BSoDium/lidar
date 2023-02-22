import React, { useEffect } from "react";
import { XR, VRButton, Controllers } from "@react-three/xr";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Sheet, useColorScheme } from "@mui/joy";
import Terrain from "./components/Terrain";
import Dummy from "./components/models/Dummy";
import Room from "./components/models/Room";
import Dashboard from "./components/Dashboard";
import MazeView from "./components/MazeView";

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
          {process.env.NODE_ENV === "development" && <Dummy />}
          <Controllers />
          <Environment preset="city" />
          <Terrain />
          <Room />
          <Dashboard />
          <group position={[0, 0, 0]}>
            <Grid
              position={[0, 0, 0]}
              renderOrder={-1}
              args={[40, 40]}
              cellSize={1}
              sectionSize={4}
              cellThickness={1}
              cellColor="#67696b"
              sectionThickness={1.5}
              sectionColor="#58616a"
              fadeDistance={50}
              fadeStrength={1}
              followCamera
              infiniteGrid
            />
            <MazeView mazeSize={19} wireframe />
          </group>
        </XR>
        <ambientLight intensity={0.1} />
        {/* <ContactShadows position={[0, 0, 0]} scale={20} blur={2} far={4.5} /> */}
        <OrbitControls />
      </Canvas>
    </Sheet>
  );
}
