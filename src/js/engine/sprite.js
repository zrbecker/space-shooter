define(function(require) {
  var Globals = require('./globals');
  var Rectangle = require('./rectangle');
  var Vector2D = require('./vector_2d');

  function Sprite(image) {
    this.image = image;
    this.position = new Vector2D(0, 0);
    this.velocity = new Vector2D(0, 0);
    this.bounds = new Rectangle(0, 0, Globals.GAME_WIDTH, Globals.GAME_HEIGHT);
  }

  Sprite.prototype.render = function(renderer) {
    renderer.drawImage(this.image, this.position);
  };

  return Sprite;
});
