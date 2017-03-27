requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    root: '..',
    engine: '../engine',
    space_shooter: '../space_shooter'
  }
});

requirejs(['jquery', 'root/main'], function(jQuery, main) {
  main();
});

