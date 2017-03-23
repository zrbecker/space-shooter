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

  function SpaceShooter(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.hero = HERO_START;

    // TODO(zrbecker): This should probably be dependent somehow on the size the
    // canvas is styled with in the HTML page.
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
  }

  SpaceShooter.prototype.render = function() {
    var ctx = this.context;
    var hero = this.hero;

    // Draw Background
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fill();

    // Draw Hero
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(hero.x, hero.y, HERO_WIDTH, HERO_HEIGHT);
    ctx.fill();
  }

  return SpaceShooter;
})();

Common.onload(function() {
  var space_shooter_canvas = document.getElementById('space-shooter');
  var space_shooter = new SpaceShooter(space_shooter_canvas);
  space_shooter.render();
});

Common.onkeydown(function(evt) {
  console.log(evt);
});
