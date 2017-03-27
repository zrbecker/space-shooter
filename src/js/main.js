define(function(require) {
  var common = require('engine/common');
  var Engine = require('engine/engine');
  var Game = require('space_shooter/scenes/game');
  var Title = require('space_shooter/scenes/title');

  return function() {
    $(document).ready(() => {
      var canvas = document.getElementById('space-shooter');
      canvas.width = 640;
      canvas.height = 400;

      var scenes = {
        Title: Title,
        Game: Game
      };
      var engine = new Engine(scenes);

      engine.setup(canvas).
        then(() => engine.load(new scenes.Title())).
        then(() => engine.start()).
        catch((err) => { console.error('Error: ' + err); });
    });
  };
});
