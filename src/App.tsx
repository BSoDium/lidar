import React, { useEffect } from "react";
import { XR, VRButton, Controllers } from "@react-three/xr";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Box, Sheet, Stack, Typography, useColorScheme } from "@mui/joy";
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
      <Box
        component="div"
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, var(--joy-palette-background-surface) 0%, rgba(0, 0, 0, 0) 100%)",
          zIndex: 1,
          gap: 3,
          p: 3,
        }}
      >
        <Stack>
          <Typography level="display1">Lidar.</Typography>
          <Typography level="h1" fontWeight="200">
            A game where light is your weapon.
          </Typography>
        </Stack>
        <Typography level="h4" textColor="text.secondary">
          Use your controller to shoot light at the walls and find your way out
          of the maze.
        </Typography>
        <Typography level="body1" marginTop={2}>
          This is a virtual reality game.
          <br />
          Please connect a VR headset to play.
        </Typography>
      </Box>
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
