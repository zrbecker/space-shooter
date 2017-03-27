define(function(require) {
  var Vector2D = require('engine/vector_2d');

  function Title() { }

  Title.prototype.setup = function(engine) {
    return new Promise((resolve, reject) => {
      this.engine = engine;
      this.engine.input.reset();
      this.engine.input.register('title.start', ' ');
      this.engine.assetLoader.loadImages({
        'title': 'images/title.png'
      }).then((images) => { this.images = images; resolve(); });
    });
  };

  Title.prototype.update = function(deltaTime) {
    if (this.engine.input.isButtonDown('title.start')) {
      this.engine.load(new this.engine.scenes.Game()).
        then(() => this.engine.start());
    }
  };

  Title.prototype.render = function() {
    this.engine.renderer.drawImage(this.images['title'], new Vector2D(0, 0));
  };

  return Title;
});
