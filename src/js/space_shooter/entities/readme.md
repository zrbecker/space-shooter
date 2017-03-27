Entities should follow the following interface.

interface Entity {
methods:
  Entity(scene)
  update(deltaTime: number)
  render(renderer: Renderer)
};
