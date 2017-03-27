define(function(require) {
  var Image = require('./image');

  function AssetLoader() { }

  AssetLoader.prototype.loadImages = function(urls) {
    // TODO(zrbecker): Need to handle failures
    return new Promise((resolve, reject) => {
      var images = {};
      var elements = [];

      for (var name in urls) {
        var url = urls[name];
        var image = new Image(url);
        images[name] = image;
        elements.push(image.element);
      }

      var count = 0;
      $(elements).on('load', function() {
        count += 1;
        if (count == elements.length) {
          resolve(images);
        }
      });
    });
  }

  return AssetLoader;
});
