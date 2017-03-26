define(function(require) {
  function Renderer(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  }

  Renderer.prototype.drawImage = function(image, position) {
    this.ctx.drawImage(image.element, position.x, position.y,
      image.dimensions.x, image.dimensions.y);
  }

  return Renderer;
});
