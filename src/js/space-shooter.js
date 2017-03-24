define(['third_party/jquery'], function() {
  Common = (function() {
    function addListener(obj, evt, func) {
      if (typeof obj[evt] == 'function') {
        var oldFunc = obj[evt];
        obj[evt] = function() {
          oldFunc.apply(null, arguments);
          func.apply(null, arguments);
        };
      } else {
        obj[evt] = func;
      }
    }

    var Common = {};
    Common.addListener = addListener;
    Common.onload = function(func) { addListener(window, 'onload', func); };
    Common.onkeydown = function(func) { addListener(window, 'onkeydown', func); };
    Common.onkeyup = function(func) { addListener(window, 'onkeyup', func); };
    return Common;
  })();

  InputEngine = (function() {
    function InputEngine() {
      this.btnToKey = {};
      this.btnIsDown = {};
      this.keyToBtn = {};

      // TODO(zrbecker): Let's make this so an object is passed to the InputEngine
      // and that object has listeners added to it.
      Common.addListener(window, 'onkeydown', this._onkeydown.bind(this));
      Common.addListener(window, 'onkeyup', this._onkeyup.bind(this));
    }

    InputEngine.prototype.register = function(btn, key) {
      if (btn in this.btnToKey) {
        console.err.log('input_engine: warning removing old button mapping');
        this.unregister(btn);
      }
      if (key in this.keyToBtn) {
        console.err.log('input_engine: warning removing old button mapping');
        this.unregister(this.keyToBtn(key));
      }
      this.btnToKey[btn] = key;
      this.btnIsDown[btn] = false;
      this.keyToBtn[key] = btn;
    };

    InputEngine.prototype.unregister = function(btn) {
      if (btn in this.btnToKey) {
        var key = this.btnToKey[btn];
        delete this.btnToKey[btn];
        delete this.btnIsDown[btn];
        if (key in this.keyToBtn) {
          delete this.keyToBtn[key];
        } else {
          console.err('input_engine: something is inconsistent');
        }
      } else {
        console.err('input_engine: no such button');
      }
    };

    InputEngine.prototype.isButtonDown = function(btn) {
      return this.btnIsDown[btn];
    };

    InputEngine.prototype._onkeydown = function(evt) {
      if (evt.key in this.keyToBtn) {
        var btn = this.keyToBtn[evt.key];
        if (!this.btnIsDown[btn]) {
          this.btnIsDown[btn] = true;
          // TODO(zrbecker): call button down listener
        }
      }
    };

    InputEngine.prototype._onkeyup = function(evt) {
      if (evt.key in this.keyToBtn) {
        var btn = this.keyToBtn[evt.key];
        if (this.btnIsDown[btn]) {
          this.btnIsDown[btn] = false;
          // TODO(zrbecker): call button up listener
        }
      }
    };

    return InputEngine;
  })();

  SpaceShooter = (function() {
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
      this.heroVelocity = { x: 0, y: 0 };
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

    return SpaceShooter;
  })();

  $(document).ready(function() {
    var space_shooter_canvas = document.getElementById('space-shooter');
    var space_shooter = new SpaceShooter(space_shooter_canvas);
    space_shooter.start();
  });
});
