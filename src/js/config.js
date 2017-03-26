requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    space_shooter: '../space_shooter'
  }
});

requirejs(['space_shooter/engine']);
