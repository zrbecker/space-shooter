Common = (function() {
  function onload(func) {
    if (typeof window.onload == 'function') {
      var oldFunc = window.onload;
      window.onload = function() {
        oldFunc();
        func();
      };
    } else {
      window.onload = func;
    }
  }

  var Common = {};
  Common.onload = onload;
  return Common;
})();

SpaceShooter = (function() {
  function SpaceShooter(canvas) {
    this.canvas = canvas;
  }

  return SpaceShooter;
})();

Common.onload(function() {
  var space_shooter_canvas = document.getElementById('space-shooter');
  var space_shooter = new SpaceShooter(space_shooter_canvas);
  console.log('space shooter constructed');
});

Common.onload(function() {
  console.log('another onload method');
});

