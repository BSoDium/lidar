![Alt text](public/android-chrome-192x192.png)
# Lidar

A virtual reality game where you have to find your way out of a maze you can't see. Use your lidar (basically a laser coupled with a light sensor) to find your way out and avoid the obstacles.

*Disclaimer: This project is still in early development. The game is playable but many features are still missing, and will hopefully be added in the future.*

## Inspiration

This game is inspired by datæ's Garry's Mod Addon LIDAR[^1], an experimental gamemode which allows players to scan a map. The horror mechanic is pretty powerful, as no moving entity can be seen as long as the player has not scanned it. This allows for some pretty 

As a matter of fact, Lidar is an actual technology used in a broad range of applications, such as autonomous vehicles, robotics, and even in the medical field. It is a laser-based system that uses a laser to scan the environment and detect the distance to objects. 

The laser is coupled with a light sensor, which detects the reflected light and allows the system to determine the distance to the object. It laser is usually pulsed, and the sensor measures the time between the pulse and the reflected light. The system is commonly mounted on a rotating platform, which allows it to scan a 360° field of view. 

The following schematic illustrates how lidar module works[^2]:

![Lidar schematic](docs/res/lidar_schematic.jpg)

In this game, the module is mounted on the player's controller. When enabled, an array of lasers is fired from the controller, and the reflected light is detected by the sensor, which generates on each pulse a low resolution depth map. Coupled to the direction of the controller, this allows the system to generate a point cloud of the environment.

## Usage

The app is hosted at [https://lidar.bsodium.fr/](https://lidar.bsodium.fr/). You can also download the source code and run it locally. It is written in TypeScript React, uses [Joy-UI](https://mui.com/) for the UI and [Three.js](https://threejs.org/) for WebGL and WebXR rendering.

To scan your surroundings, use your right controller to point the laser array at any surface. Squeeze the trigger to start capturing point cloud data, and release it to stop. The captured data will be displayed as a point cloud in the scene.

Currently, movement is not implemented, so you can only scan a small part of the maze. Obviously, you could just move around in the real world, but since the maze is appoximately 40m x 40m, it would be a bit impractical.

## Screenshots

| ![Screenshot 0](docs/res/screenshot_0.png)                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overview of the scanned maze. Here, the player has places his controller over the wall, in order to scan otherwise inaccessible areas. As expected, the point cloud is less dense in regions located further away from the controller. |

| ![Screenshot 1](docs/res/screenshot_1.png)                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Another point of view of the same scene. One can identify the grid pattern of the point cloud, which is due to the laser array being square-shaped. |

| ![Screenshot 2](docs/res/screenshot_2.png)                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Here is a first person view of the maze (in VR mode, recorded using the WebXR extension[^3] by Mozilla), the controllers are barely visible due to poor contrast, but can still be seen in the bottom half of the image. |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[^1]: [LIDAR, Gamemode Addon for Garry's Mod](https://steamcommunity.com/sharedfiles/filedetails/?id=2813176307&searchtext=)

[^2]: [Choi, Hyun & Park, No-Cheol & Kim, Wan-Chin. (2020). Optical system design for light detection and ranging with ultra-wide field-of-view using liquid lenses. Microsystem Technologies. 26. 10.1007/s00542-019-04490-4.](https://www.researchgate.net/publication/333379409_Optical_system_design_for_light_detection_and_ranging_with_ultra-wide_field-of-view_using_liquid_lenses/related)

[^3]: [WebXR Extension for Firefox](https://addons.mozilla.org/en-US/firefox/addon/webxr-api-emulator/)