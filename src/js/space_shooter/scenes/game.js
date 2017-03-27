define(function(require) {
  var common = require('engine/common');
  var Vector2D = require('engine/vector_2d');

  function Game() { }

  Game.prototype.setup = function(engine) {
    return new Promise((resolve, reject) => {
      this.engine = engine;

      this.engine.input.reset();
      this.engine.input.register('game.esc', 'Escape');
      this.engine.input.register('game.up', 'w');
      this.engine.input.register('game.left', 'a');
      this.engine.input.register('game.down', 's');
      this.engine.input.register('game.right', 'd');

      this.bgPosition = this.engine.canvas.width;
      this.elapsed = 0;
      this.msPerUpdate = 1000 / 30; // 30 updates per second

      this.engine.assetLoader.loadImages({
        'background': 'images/space_background.png',
        'hero': 'images/hero.png',
      }).then((images) => { this.images = images; resolve(); });
    });
  };

  Game.prototype.update = function(deltaTime) {
    if (this.engine.input.isButtonDown('game.esc')) {
      this.engine.load(new this.engine.scenes.Title()).
        then(() => this.engine.start());
    }
    this.elapsed += deltaTime;
    if (this.elapsed > this.msPerUpdate) {
      this.bgPosition -= 200 * this.elapsed / 1000;
      while (this.bgPosition < 0) {
        this.bgPosition += this.engine.canvas.width;
      }
      this.elapsed = 0;
    }
  };

  Game.prototype.render = function() {
    this.engine.renderer.drawImage(this.images['background'],
      new Vector2D(this.bgPosition - this.engine.canvas.width, 0));
    this.engine.renderer.drawImage(this.images['background'],
      new Vector2D(this.bgPosition, 0));
  };

  return Game;
});
