import React from "react";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "react-three-fiber";
import { Sheet } from "@mui/joy";

export default function GameView() {
  return (
    <Sheet
      component="div"
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "#2b2b32",
      }}
    >
      <>
        <VRButton />
        <Canvas>
          <XR>
            <Controllers />
            <Hands />
            <mesh>
              <boxGeometry />
              <meshBasicMaterial color="blue" />
            </mesh>
          </XR>
        </Canvas>
      </>
    </Sheet>
  );
}
