requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    space_shooter: '../space_shooter'
  }
});

requirejs(['jquery', 'space_shooter/space_shooter']);
