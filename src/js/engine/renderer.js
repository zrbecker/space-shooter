var context = undefined;
var img = undefined;
var pos = undefined;
define(function(require) {
  function Renderer(canvas) {
    this.canvas = canvas;
  }

  Renderer.prototype.drawImage = function(image, position) {
    this.ctx = this.canvas.getContext('2d');
    context = this.ctx;
    img = image;
    pos = position;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(image.element, position.x, position.y,
      image.dimensions.x, image.dimensions.y);
  }

  return Renderer;
});
