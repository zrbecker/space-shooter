module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          // copy index.html
          { expand: true, cwd: 'src/', src: 'index.html', dest: 'dist/' },
          // copy images
          { expand: true, cwd: 'src/', src: 'images/**/*.png', dest: 'dist/' },
          // copy javascript
          { expand: true, cwd: 'src/', src: 'js/**/*.js', dest: 'dist/' },
          // copy requirejs
          {
            expand: true,
            cwd: 'node_modules/requirejs/',
            src: 'require.js',
            dest: 'dist/js/lib/'
          },
          // copy jquery
          {
            expand: true,
            cwd: 'node_modules/jquery/dist/',
            src: 'jquery.js',
            dest: 'dist/js/lib/'
          }
        ]
      }
    },
    watch: {
      all: {
        files: [
          'src/index.html',
          'src/js/**/*.js',
          'src/images/**/*.png',
          'node_modules/requirejs/require.js',
          'node_modules/jquery/dist/jquery.js'
        ],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy']);
};
