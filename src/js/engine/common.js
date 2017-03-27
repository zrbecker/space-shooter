define(function() {
  var common = {};

  common.TruePromise = function() {
    var args = arguments;
    return function() {
      return new Promise(function(resolve, reject) { resolve(args); });
    };
  };

  common.FalsePromise = function(message) {
    return function() {
      return new Promise(function(resolve, reject) { reject(message); });
    };
  };

  common.SleepAsync = function(ms) {
    return new Promise(function(resolve, reject) {
      var start = Date.now();
      var loop = function() {
        if (Date.now() < start + ms) {
          setTimeout(loop, 0);
        } else {
          resolve();
        }
      };
      loop();
    });
  };

  return common;
});
