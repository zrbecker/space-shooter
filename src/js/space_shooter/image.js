define(function(require) {
  var $ = require('jquery');
  var Vector2D = require('./vector_2d');

  function Image_(url) {
    this.element = new Image();
    this.element.src = url;
    $(this.element).on('load', this._onElementLoad.bind(this));
  }

  Image_.prototype.scale = function(scale) {
    this.dimensions.x = this.dimensions.x * scale;
    this.dimensions.y = this.dimensions.y * scale;
  };

  Image_.prototype._onElementLoad = function() {
      this.dimensions = new Vector2D(
        this.element.width, this.element.height);
  }

  return Image_;
});
