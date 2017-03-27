This directory will be used for various scenes in the game. For example, the
title screen is a scene, the game itself can be a scene, or the gameover screen
can be a scene.

Scenes should follow the following interface.

interface Scene {
obejcts:
  entities: [Entity]
methods:
  Scene(engine: Engine)
}

