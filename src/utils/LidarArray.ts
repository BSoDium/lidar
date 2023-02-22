import { ArrowHelper, Line, Mesh, Points, Raycaster, Vector2, Vector3 } from "three"

interface Beam {
  raycaster: Raycaster
  helper: ArrowHelper
  shift: Vector2
}

/**
 * A class to represent a 2D array of raycasters.
 */
export default class LidarArray {
  private _size: number
  private _array: Beam[] = []

  constructor(size: number = 10) {
    this._size = size
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        const raycaster = new Raycaster();
        const helper = new ArrowHelper();
        const shift = new Vector2(4 * (i - (this._size / 2)), 4 * (j - (this._size / 2)))
        this._array.push({ raycaster, helper, shift })
      }
    }
  }

  get size() {
    return this._size
  }

  get array() {
    return this._array
  }

  getRaycaster(index: number) {
    return this._array[index]
  }

  setRaycaster(index: number, raycaster: Raycaster) {
    this._array[index].raycaster = raycaster
  }

  getHelper(index: number) {
    return this._array[index].helper
  }

  setHelper(index: number, helper: ArrowHelper) {
    this._array[index].helper = helper
  }

  getShift(index: number) {
    return this._array[index].shift
  }

  setShift(index: number, shift: Vector2) {
    this._array[index].shift = shift
  }

  getObjects() {
    return this._array.map((beam) => beam.helper)
  }

  setDirection(direction: Vector3, right: Vector3, up: Vector3) {
    this._array.forEach((beam) => {
      // Shift the raycaster direction by the shift vector (in radians)
      const shift = beam.shift.clone().multiplyScalar(Math.PI / 180)
      const shiftedDirection = direction.clone().applyAxisAngle(right, shift.x).applyAxisAngle(up, shift.y)
      beam.raycaster.ray.direction.copy(shiftedDirection)
      beam.helper.setDirection(shiftedDirection)
    })
  }

  setOrigin(origin: Vector3) {
    this._array.forEach((beam) => {
      beam.raycaster.ray.origin.copy(origin)
      beam.helper.position.copy(origin)
    })
  }

  intersectObject(object: Mesh | Line | Points) {
    const intersections = this._array.map((beam) => beam.raycaster.intersectObject(object));
    for (let i = 0; i < intersections.length; i++) {
      if (intersections[i].length) {
        this._array[i].helper.setLength(intersections[i][0].distance)
        this._array[i].helper.setColor('green')
      } else {
        this._array[i].helper.setLength(10)
        this._array[i].helper.setColor('red')
      }
    }
    return intersections;
  }

}