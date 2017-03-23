Common = (function() {
  function addListener(method, func) {
    if (typeof window[method] == 'function') {
      var oldFunc = window[method];
      window[method] = function() {
        oldFunc.apply(null, arguments);
        func.apply(null, arguments);
      };
    } else {
      window[method] = func;
    }
  }

  var Common = {};
  Common.onload = function(func) { addListener('onload', func); };
  Common.onkeydown = function(func) { addListener('onkeydown', func); };
  Common.onkeyup = function(func) { addListener('onkeyup', func); };
  return Common;
})();

SpaceShooter = (function() {
  const GAME_WIDTH = 640;
  const GAME_HEIGHT = 400;

  const HERO_WIDTH = 50;
  const HERO_HEIGHT = 50;

  // TODO(zrbecker): Change start position to be based on reasonable parameters
  // and not simply hard coded.
  const HERO_START = { x: HERO_WIDTH / 2, y: (GAME_HEIGHT - HERO_HEIGHT) / 2 };

  const HERO_SPEED = 200;

  const FRAME_RATE = 30;

  function SpaceShooter(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.heroPosition = HERO_START;
    this.heroVelocity = { x: 0, y: 0 };
    this.lastUpdate = Date.now();
    this.keyState = {};

    // TODO(zrbecker): This should probably be dependent somehow on the size the
    // canvas is styled with in the HTML page.
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    Common.onkeydown(this.onkeydown.bind(this));
    Common.onkeyup(this.onkeyup.bind(this));
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
      var heroVel = this.heroVelocity;

      heroPos.x += heroVel.x * deltaTime / 1000;
      heroPos.y += heroVel.y * deltaTime / 1000;
    }
  };

  SpaceShooter.prototype.render = function() {
    var ctx = this.context;
    var heroPos = this.heroPosition;

    // Draw Background
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fill();

    // Draw Hero
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(heroPos.x, heroPos.y, HERO_WIDTH, HERO_HEIGHT);
    ctx.fill();
  };

  SpaceShooter.prototype.onkeydown = function(evt) {
    var heroVel = this.heroVelocity;
    var keys = this.keyState;
    switch (evt.key) {
      case 'w':
        if (!keys['w']) {
          keys['w'] = true;
          heroVel.y += -HERO_SPEED;
        }
        break;
      case 'a':
        if (!keys['a']) {
          keys['a'] = true;
          heroVel.x += -HERO_SPEED;
        }
        break;
      case 's':
        if (!keys['s']) {
          keys['s'] = true;
          heroVel.y += HERO_SPEED;
        }
        break;
      case 'd':
        if (!keys['d']) {
          keys['d'] = true;
          heroVel.x += HERO_SPEED;
        }
        break;
    }
  };

  SpaceShooter.prototype.onkeyup = function(evt) {
    var heroVel = this.heroVelocity;
    var keys = this.keyState;
    switch (evt.key) {
      case 'w':
        keys['w'] = false;
        heroVel.y -= -HERO_SPEED;
        break;
      case 'a':
        keys['a'] = false;
        heroVel.x -= -HERO_SPEED;
        break;
      case 's':
        keys['s'] = false;
        heroVel.y -= HERO_SPEED;
        break;
      case 'd':
        keys['d'] = false;
        heroVel.x -= HERO_SPEED;
        break;
    }
  };

  return SpaceShooter;
})();

Common.onload(function() {
  var space_shooter_canvas = document.getElementById('space-shooter');
  var space_shooter = new SpaceShooter(space_shooter_canvas);
  space_shooter.start();
});

