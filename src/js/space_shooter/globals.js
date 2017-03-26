define(function(require) {
  var Vector2D = require('./vector_2d');
  return new function() {
    this.GAME_WIDTH = 640;
    this.GAME_HEIGHT = 400;

    this.FRAME_RATE = 30;

    this.IMG_BACKGROUND_SRC = 'images/space_background.png';
    this.IMG_HERO_SRC = 'images/hero.png';

    this.BACKGROUND_SPEED = 200;

    this.HERO_POSITION = new Vector2D(0, this.GAME_HEIGHT / 2);
    this.HERO_SPEED = new Vector2D(200, 300);
  };
});
