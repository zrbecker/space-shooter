requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    'app' : '../space_shooter'
  }
});

requirejs(['jquery', 'app/asset_loader', 'app/renderer', 'app/vector_2d'],
    function($, AssetLoader, Renderer, Vector2D) {
  $(document).ready(function() {
    var loader = new AssetLoader();
    loader.loadImages({
      'hero': 'images/hero.png',
      'background': 'images/space_background.png',
    }, function(images) {
      var canvas = $('#test')[0];
      canvas.width = 500;
      canvas.height = 400;
      canvas.style.border = '1px solid black';

      var renderer = new Renderer(canvas);
      var imgHero = images['hero'];
      imgHero.scale(8);
      renderer.drawImage(images['hero'], new Vector2D(10, 10));
    });
  });
});
