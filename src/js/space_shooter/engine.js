define(function(require) {
  var $ = require('jquery');
  var AssetLoader = require('./asset_loader');
  var Globals = require('./globals');
  var InputEngine = require('./input_engine');
  var Renderer = require('./renderer');
  var Sprite = require('./sprite');
  var Vector2D = require('./vector_2d');

  function SpaceShooter(canvas) {
    this.canvas = canvas;
    canvas.width = Globals.GAME_WIDTH;
    canvas.height = Globals.GAME_HEIGHT;

    this.renderer = new Renderer(canvas);

    this.lastUpdate = Date.now();

    this.input = new InputEngine();
    this.input.register('hero_up', 'w');
    this.input.register('hero_left', 'a');
    this.input.register('hero_down', 's');
    this.input.register('hero_right', 'd');

    this.loader = new AssetLoader();
    this.loader.loadImages({
      'hero': Globals.IMG_HERO_SRC,
      'background': Globals.IMG_BACKGROUND_SRC,
    }, this.onImagesLoaded.bind(this));
  }

  SpaceShooter.prototype.onImagesLoaded = function(images) {
    this.hero = new Sprite(images['hero']);
    this.hero.position = Globals.HERO_POSITION;
    this.hero.image.scale(8);
    this.hero.bounds.width =
      Globals.GAME_WIDTH / 2 - this.hero.image.dimensions.x;
    this.hero.bounds.height =
      Globals.GAME_HEIGHT - this.hero.image.dimensions.y;

    this.bgLeft = new Sprite(images['background']);
    this.bgRight = new Sprite(images['background']);
    this.bgRight.x = Globals.GAME_WIDTH;

    this.start();
  };

  SpaceShooter.prototype.start = function() {
    var loop = function() {
      this.update();
      this.render();
      setTimeout(loop, 0);
    }.bind(this);
    loop();
  };

  SpaceShooter.prototype.update = function() {
    var now = Date.now();
    var deltaTime = now - this.lastUpdate;
    if (deltaTime > 1000 / Globals.FRAME_RATE) {
      this.lastUpdate = now;

      this.hero.velocity = new Vector2D(0, 0);
      if (this.input.isButtonDown('hero_up')) {
        this.hero.velocity.y -= Globals.HERO_SPEED.y;
      }
      if (this.input.isButtonDown('hero_down')) {
        this.hero.velocity.y += Globals.HERO_SPEED.y;
      }
      if (this.input.isButtonDown('hero_left')) {
        this.hero.velocity.x -= Globals.HERO_SPEED.x;
      }
      if (this.input.isButtonDown('hero_right')) {
        this.hero.velocity.x += Globals.HERO_SPEED.x;
      }

      this.hero.position.x += this.hero.velocity.x * deltaTime / 1000;
      this.hero.position.y += this.hero.velocity.y * deltaTime / 1000;

      this.hero.position.x = Math.max(this.hero.bounds.x,
        Math.min(this.hero.bounds.x + this.hero.bounds.width,
          this.hero.position.x));
      this.hero.position.y = Math.max(this.hero.bounds.y,
        Math.min(this.hero.bounds.y + this.hero.bounds.height,
          this.hero.position.y));

      var bgPosX = this.bgRight.position.x;
      bgPosX -= Globals.BACKGROUND_SPEED * deltaTime / 1000;
      if (bgPosX < 0) {
        bgPosX = Globals.GAME_WIDTH;
      }
      this.bgLeft.position.x = bgPosX - Globals.GAME_WIDTH;
      this.bgRight.position.x = bgPosX;
    }
  };

  SpaceShooter.prototype.render = function() {
    this.bgLeft.render(this.renderer);
    this.bgRight.render(this.renderer);
    this.hero.render(this.renderer);
  };

  $(document).ready(function() {
    var canvas = document.getElementById('space-shooter');
    var spaceShooter = new SpaceShooter(canvas);
  });
});
