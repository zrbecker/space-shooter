define(function() {
  function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Rectangle.prototype.contains = function(point) {
    return (this.x <= point.x && point.x < this.x + this.width) &&
      (this.y <= point.y && this.y < this.y + this.height);
  };

  return Rectangle;
});
