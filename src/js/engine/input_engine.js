define(function() {
  function InputEngine() {
    this.btnToKey = {};
    this.btnIsDown = {};
    this.keyToBtn = {};

    // TODO(zrbecker): Let's make this so an object is passed to the InputEngine
    // and that object has listeners added to it.
    $(document).keydown(this._onkeydown.bind(this));
    $(document).keyup(this._onkeyup.bind(this));
  }

  InputEngine.prototype.reset = function() {
    this.btnToKey = {};
    this.btnIsDown = {};
    this.keyToBtn = {};
  };

  InputEngine.prototype.register = function(btn, key) {
    if (btn in this.btnToKey) {
      console.err.log('input_engine: warning removing old button mapping');
      this.unregister(btn);
    }
    if (key in this.keyToBtn) {
      console.err.log('input_engine: warning removing old button mapping');
      this.unregister(this.keyToBtn(key));
    }
    this.btnToKey[btn] = key;
    this.btnIsDown[btn] = false;
    this.keyToBtn[key] = btn;
  };

  InputEngine.prototype.unregister = function(btn) {
    if (btn in this.btnToKey) {
      var key = this.btnToKey[btn];
      delete this.btnToKey[btn];
      delete this.btnIsDown[btn];
      if (key in this.keyToBtn) {
        delete this.keyToBtn[key];
      } else {
        console.err('input_engine: something is inconsistent');
      }
    } else {
      console.err('input_engine: no such button');
    }
  };

  InputEngine.prototype.isButtonDown = function(btn) {
    return this.btnIsDown[btn];
  };

  InputEngine.prototype._onkeydown = function(evt) {
    if (evt.key in this.keyToBtn) {
      var btn = this.keyToBtn[evt.key];
      if (!this.btnIsDown[btn]) {
        this.btnIsDown[btn] = true;
        // TODO(zrbecker): call button down listener
      }
    }
  };

  InputEngine.prototype._onkeyup = function(evt) {
    if (evt.key in this.keyToBtn) {
      var btn = this.keyToBtn[evt.key];
      if (this.btnIsDown[btn]) {
        this.btnIsDown[btn] = false;
        // TODO(zrbecker): call button up listener
      }
    }
  };

  return InputEngine;
});
