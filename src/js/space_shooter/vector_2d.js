define(function() {
  function Vector2D(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector2D.prototype.add = function(point) {
    this.x += point.x;
    this.y += point.y;
  }

  return Vector2D;
});
