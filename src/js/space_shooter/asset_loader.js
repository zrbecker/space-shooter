define(function(require) {
  var $ = require('jquery');
  var Image = require('./image');

  function AssetLoader() { }

  AssetLoader.prototype.loadImages = function(imageUrls, callback) {
    var imageDictionary = {};
    var imageArray = [];
    for (var imageName in imageUrls) {
      var image = new Image(imageUrls[imageName]);
      imageDictionary[imageName] = image;
      imageArray.push(image.element);
    }
    var count = 0;
    $(imageArray).on('load', function() {
      count += 1;
      if (count == imageArray.length) {
        callback(imageDictionary);
      }
    });
  }

  return AssetLoader;
});
