import * as THREE from 'three';

export interface CulledFaces {
  /** Face that is facing the positive x-axis */
  px: boolean;
  /** Face that is facing the negative x-axis */
  nx: boolean;
  /** Face that is facing the positive y-axis */
  py: boolean;
  /** Face that is facing the negative y-axis */
  ny: boolean;
  /** Face that is facing the positive z-axis */
  pz: boolean;
  /** Face that is facing the negative z-axis */
  nz: boolean;
}

export function Cube(position: THREE.Vector3, cull: CulledFaces = {
  px: false,
  nx: false,
  py: false,
  ny: false,
  pz: false,
  nz: false,
}, size: number = 1) {
  const vertices = [
    new THREE.Vector3(position.x, position.y, position.z),
    new THREE.Vector3(position.x + size, position.y, position.z),
    new THREE.Vector3(position.x + size, position.y, position.z + size),
    new THREE.Vector3(position.x, position.y, position.z + size),
    new THREE.Vector3(position.x, position.y + size, position.z),
    new THREE.Vector3(position.x + size, position.y + size, position.z),
    new THREE.Vector3(position.x + size, position.y + size, position.z + size),
    new THREE.Vector3(position.x, position.y + size, position.z + size),
  ]

  const faces = [];

  !cull.px && faces.push({ a: 1, b: 5, c: 6 });
  !cull.px && faces.push({ a: 1, b: 6, c: 2 });

  !cull.nx && faces.push({ a: 7, b: 4, c: 0 });
  !cull.nx && faces.push({ a: 3, b: 7, c: 0 });

  !cull.py && faces.push({ a: 4, b: 7, c: 6 });
  !cull.py && faces.push({ a: 4, b: 6, c: 5 });

  !cull.ny && faces.push({ a: 2, b: 3, c: 0 });
  !cull.ny && faces.push({ a: 1, b: 2, c: 0 });

  !cull.pz && faces.push({ a: 6, b: 7, c: 3 });
  !cull.pz && faces.push({ a: 2, b: 6, c: 3 });

  !cull.nz && faces.push({ a: 0, b: 4, c: 5 });
  !cull.nz && faces.push({ a: 0, b: 5, c: 1 });


  // Compute normals
  faces.forEach(face => {
    const a = vertices[face.a];
    const b = vertices[face.b];
    const c = vertices[face.c];

    const ab = b.clone().sub(a);
    const ac = c.clone().sub(a);

    const normal = ab.cross(ac).normalize();

    (face as THREE.Face).normal = normal;
  });

  return { vertices, faces: faces as THREE.Face[] };
}
