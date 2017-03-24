define(['third_party/jquery', 'input-engine'], function() {
  var InputEngine = require('input-engine');

  const GAME_WIDTH = 640;
  const GAME_HEIGHT = 400;

  const HERO_SCALE = 8;
  const HERO_WIDTH = HERO_SCALE * 9;
  const HERO_HEIGHT = HERO_SCALE * 5;

  // TODO(zrbecker): Change start position to be based on reasonable parameters
  // and not simply hard coded.
  const HERO_START = { x: HERO_WIDTH / 2, y: (GAME_HEIGHT - HERO_HEIGHT) / 2 };
  const HERO_BOUNDS = {
    minX: HERO_WIDTH / 4,
    maxX: GAME_WIDTH / 2 - HERO_WIDTH,
    minY: HERO_WIDTH / 4,
    maxY: GAME_HEIGHT - HERO_HEIGHT - HERO_WIDTH / 4
  };

  const HERO_SPEED_X = 200;
  const HERO_SPEED_Y = 300;
  const BACKGROUND_SPEED = 200;

  const FRAME_RATE = 30;

  function SpaceShooter(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.heroPosition = HERO_START;
    this.lastUpdate = Date.now();
    this.keyState = {};
    this.images = {};
    this.backgroundPositionX = 0;

    this.input = new InputEngine();
    this.input.register('hero_up', 'w');
    this.input.register('hero_left', 'a');
    this.input.register('hero_down', 's');
    this.input.register('hero_right', 'd');

    // TODO(zrbecker): This should probably be dependent somehow on the size the
    // canvas is styled with in the HTML page.
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    this.loadImages();
  }

  const IMAGE_BACKGROUND_SRC = 'images/space_background.png';
  const IMAGE_HERO_SRC = 'images/hero.png';
  SpaceShooter.prototype.loadImages = function() {
    // TODO(zrbecker): There should probable be some checking, or Promise style
    // handling to ensure that these images are actually loaded before the game
    // starts playing.
    this.images['background'] = new Image();
    this.images['background'].src = IMAGE_BACKGROUND_SRC;

    this.images['hero'] = new Image();
    this.images['hero'].src = IMAGE_HERO_SRC;
  }

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
    if (deltaTime > 1000 / FRAME_RATE) {
      this.lastUpdate = now;

      var heroPos = this.heroPosition;

      var heroVel = { x: 0, y: 0 };
      if (this.input.isButtonDown('hero_up')) heroVel.y -= HERO_SPEED_Y;
      if (this.input.isButtonDown('hero_down')) heroVel.y += HERO_SPEED_Y;
      if (this.input.isButtonDown('hero_left')) heroVel.x -= HERO_SPEED_X;
      if (this.input.isButtonDown('hero_right')) heroVel.x += HERO_SPEED_X;

      heroPos.x += heroVel.x * deltaTime / 1000;
      heroPos.y += heroVel.y * deltaTime / 1000;

      heroPos.x = Math.max(HERO_BOUNDS.minX,
        Math.min(HERO_BOUNDS.maxX, heroPos.x));
      heroPos.y = Math.max(HERO_BOUNDS.minY,
        Math.min(HERO_BOUNDS.maxY, heroPos.y));

      this.backgroundPositionX -= BACKGROUND_SPEED * deltaTime / 1000;
      if (this.backgroundPositionX < 0) {
        this.backgroundPositionX = GAME_WIDTH;
      }
    }
  };

  SpaceShooter.prototype.render = function() {
    var ctx = this.context;
    var heroPos = this.heroPosition;

    var imgBg = this.images['background'];
    var imgHero = this.images['hero'];
    var bgPosX = this.backgroundPositionX;

    // Draw Background
    ctx.drawImage(imgBg, bgPosX, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.drawImage(imgBg, bgPosX - GAME_WIDTH, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw Hero
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(imgHero, heroPos.x, heroPos.y, HERO_WIDTH, HERO_HEIGHT);
  };


  $(document).ready(function() {
    var spaceShooterCanvas = document.getElementById('space-shooter');
    var spaceShooter = new SpaceShooter(spaceShooterCanvas);
    spaceShooter.start();
  });
});
