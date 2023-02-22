import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import MorphingMesh from "../utils/MorphingMesh";
import { Cube, CulledFaces } from "../utils/Geometry";
import PointData from "./PointData";

export interface MazeCell {
  x: number;
  y: number;
  value: boolean; // true = path, false = wall
}

export interface Maze {
  cells: MazeCell[][]; // 2D array of cells
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function generateMaze(width: number, height: number): Promise<Maze> {
  const maze: Maze = { cells: [] };

  for (let y = 0; y < height; y++) {
    const row: MazeCell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, value: true });
    }
    maze.cells.push(row);
  }

  // Using depth-first search to create the perfect maze
  const dfs = (x: number, y: number) => {
    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];
    shuffle(directions);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        maze.cells[ny][nx].value
      ) {
        maze.cells[y + dy / 2][x + dx / 2].value = false;
        maze.cells[ny][nx].value = false;
        dfs(nx, ny);
      }
    }
  };

  dfs(0, 0);

  return Promise.resolve(maze);
}

const Walls = ({
  maze,
  wireframe = false,
}: {
  maze: Maze;
  wireframe?: boolean;
}) => {
  const { cells } = maze;

  const mesh = new MorphingMesh();
  const meshRef = useRef() as React.MutableRefObject<THREE.Mesh>;

  cells.forEach((cellRow, i) => {
    cellRow.forEach((cell, j) => {
      if (!cell.value) {
        // Check neighbor cells to see which faces to cull
        const culledFaces: CulledFaces = {
          px:
            !(j < cellRow.length - 1 && cellRow[j + 1].value) &&
            j < cellRow.length - 1,
          nx: !(j > 0 && cellRow[j - 1].value) && j > 0,
          pz:
            !(i < cells.length - 1 && cells[i + 1][j].value) &&
            i < cells.length - 1,
          nz: !(i > 0 && cells[i - 1][j].value) && i > 0,
          py: false,
          ny: false,
        };

        const { vertices, faces } = Cube(
          new THREE.Vector3(
            cell.x - cells.length / 2,
            0,
            cell.y - cellRow.length / 2
          ),
          culledFaces
        );
        mesh.addMesh(vertices, faces);
      }
    });

    // Add the floor (covering the entire maze)
    const vertices = [
      new THREE.Vector3(-cells.length / 2, 0, -cellRow.length / 2),
      new THREE.Vector3(-cells.length / 2, 0, cellRow.length / 2),
      new THREE.Vector3(cells.length / 2, 0, cellRow.length / 2),
      new THREE.Vector3(cells.length / 2, 0, -cellRow.length / 2),
    ];
    const faces = [
      { a: 0, b: 1, c: 2, normal: new THREE.Vector3(0, 1, 0) },
      { a: 0, b: 2, c: 3, normal: new THREE.Vector3(0, 1, 0) },
    ] as THREE.Face[];
    mesh.addMesh(vertices, faces);
  });
  mesh.clean();

  return (
    <>
      <PointData environmentRef={meshRef} />
      <mesh
        ref={meshRef}
        visible={process.env.NODE_ENV === "development"}
        castShadow
        position={[0, 0, 0]}
        scale={[3, 3, 3]}
        geometry={mesh.toGeometry()}
      >
        <meshStandardMaterial
          color="#e33365"
          wireframe={wireframe}
          roughness={1}
          flatShading
        />
      </mesh>
    </>
  );
};

export interface MazeViewSettings {
  mazeSize: number;
  wireframe: boolean;
}

export default function MazeView({ mazeSize, wireframe }: MazeViewSettings) {
  const [maze, setMaze] = useState<Maze>();

  useEffect(() => {
    generateMaze(mazeSize, mazeSize).then((maze) => {
      setMaze(maze);
    });
  }, [mazeSize]);

  return maze ? <Walls maze={maze} wireframe={wireframe} /> : null;
}
