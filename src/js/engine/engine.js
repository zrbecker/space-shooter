define(function(require) {
  var common = require('./common');

  var AssetLoader = require('./asset_loader');
  var InputEngine = require('./input_engine');
  var Renderer = require('./renderer');

  function Engine(scenes) {
    this.scenes = scenes;
  }

  Engine.prototype.setup = function(canvas) {
    this.setup = common.FalsePromise('Engine is already setting up.');
    return new Promise((resolve, reject) => {
      this.canvas = canvas;
      this.assetLoader = new AssetLoader();
      this.input = new InputEngine();
      this.renderer = new Renderer(canvas);
      this.load = this._private.load;
      this.setup = common.FalsePromise('Engine is already setup.');
      resolve();
    });
  }

  Engine.prototype.load = common.FalsePromise('Engine is not setup.');
  Engine.prototype.start = common.FalsePromise('Scene is not loaded.');
  Engine.prototype.stop = common.TruePromise();

  Engine.prototype._private = {};

  Engine.prototype._private.load = function(scene) {
    this.load = common.FalsePromise('Scene is already loading.');
    return new Promise((resolve, reject) => {
      this.stop().then(() => {
        this.start = common.FalsePromise('Scene is not loaded');
        this.scene = scene;
        this.scene.setup(this).then(() => {
          this.load = this._private.load;
          this.start = this._private.start;
          resolve();
        }).catch((err) => {
          this.load = this._private.load;
          reject(err);
        });
      });
    });
  };

  Engine.prototype._private.loop = () => {}

  Engine.prototype._private.start = function() {
    this.start = common.FalsePromise('Engine is already started.');
    this.stop = this._private.stop;

    this._private.loop = () => {
      var now = Date.now();
      var deltaTime = now - this.lastUpdate;
      this.lastUpdate = Date.now();

      this.scene.update(deltaTime);
      this.scene.render();

      setTimeout(this._private.loop, 0);
    };

    this.lastUpdate = Date.now();
    setTimeout(this._private.loop, 0);
  };

  Engine.prototype._private.stop = function() {
    this.stop = common.TruePromise();
    this.load = common.FalsePromise('Cannot load a scene while stopping.');
    return new Promise((resolve, reject) => {
      this._private.loop = () => {
        this._private.loop = () => {};
        this.start = this._private.start;
        this.load = this._private.load;
        resolve();
      };
    });
  };

  return Engine;
});

