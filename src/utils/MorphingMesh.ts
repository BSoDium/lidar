import * as THREE from 'three';

export default class MorphingMesh {
  private _vertices: THREE.Vector3[];
  private _faces: THREE.Face[];
  private _autoGarbageCollect: boolean;

  constructor(vertices: THREE.Vector3[] = [], faces: THREE.Face[] = [], autoGarbageCollect: boolean = false) {
    this._autoGarbageCollect = autoGarbageCollect;
    this._vertices = vertices;
    this._faces = faces;
  }

  /**
   * Merge identical/overlapping vertices and faces.
   */
  private _garbageCollect(): void {
    for (let i = 0; i < this._vertices.length; i++) {
      for (let j = i + 1; j < this._vertices.length; j++) {
        if (this._vertices[i].equals(this._vertices[j])) {
          this._vertices.splice(j, 1);
          this._faces.forEach(face => {
            if (face.a === j) {
              face.a = i;
            } else if (face.a > j) {
              face.a--;
            }
            if (face.b === j) {
              face.b = i;
            } else if (face.b > j) {
              face.b--;
            }
            if (face.c === j) {
              face.c = i;
            } else if (face.c > j) {
              face.c--;
            }
          });
          j--;
        }
      }
    }
  }

  public get vertices(): THREE.Vector3[] {
    return this._vertices;
  }

  public get faces(): THREE.Face[] {
    return this._faces;
  }

  /**
   * Add a single vertex to the current mesh.
   * @param vertex 
   */
  public addVertex(vertex: THREE.Vector3): void {
    this._vertices.push(vertex);
    this._autoGarbageCollect && this._garbageCollect();
  }

  /**
   * Add several vertices to the current mesh.
   * @param vertices
   */
  public addVertices(vertices: THREE.Vector3[]): void {
    this._vertices = this._vertices.concat(vertices);
    this._autoGarbageCollect && this._garbageCollect();
  }

  /**
   * Add a single face to the current mesh. The vertex indices for the face should
   * refer to existing and/or new vertices in the current mesh.
   * @param face
   */
  public addFace(face: THREE.Face): void {
    this._faces.push(face);
    this._autoGarbageCollect && this._garbageCollect();
  }

  /**
   * Add several faces to the current mesh. The vertex indices for the faces should
   * refer to existing and/or new vertices in the current mesh.
   * @param faces 
   */
  public addFaces(faces: THREE.Face[]): void {
    this._faces = this._faces.concat(faces);
    this._autoGarbageCollect && this._garbageCollect();
  }

  /**
   * Add a mesh to the current mesh. The vertex indices for the faces should not
   * be offset by the number of vertices in the current mesh, as this is handled
   * internally.
   * @param vertices 
   * @param faces 
   */
  public addMesh(vertices: THREE.Vector3[], faces: THREE.Face[]): void {
    const offset = this._vertices.length;
    this.addVertices(vertices);
    this.addFaces(faces.map(face => {
      return {
        ...face,
        a: face.a + offset,
        b: face.b + offset,
        c: face.c + offset,
      };
    }));
    this._autoGarbageCollect && this._garbageCollect();
  }

  public clean(): void {
    this._garbageCollect();
  }


  public toGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(this._vertices.length * 3);
    const faces = new Uint32Array(this._faces.length * 3);
    this._vertices.forEach((vertex, i) => {
      vertices[i * 3] = vertex.x;
      vertices[i * 3 + 1] = vertex.y;
      vertices[i * 3 + 2] = vertex.z;
    });

    this._faces.forEach((face, i) => {
      faces[i * 3] = face.a;
      faces[i * 3 + 1] = face.b;
      faces[i * 3 + 2] = face.c;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(faces, 1));
    geometry.computeVertexNormals();

    return geometry;
  }

}