module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          // copy index.html
          { expand: true, cwd: 'src/', src: 'index.html', dest: 'dist/' },
          // copy images
          { expand: true, cwd: 'src/', src: 'images/**', dest: 'dist/' },
          // copy javascript
          { expand: true, cwd: 'src/', src: 'js/**', dest: 'dist/' },
          // copy requirejs
          {
            expand: true,
            cwd: 'node_modules/requirejs/',
            src: 'require.js',
            dest: 'dist/js/third_party/'
          },
          // copy jquery
          {
            expand: true,
            cwd: 'node_modules/jquery/dist/',
            src: 'jquery.js',
            dest: 'dist/js/third_party/'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: 'src/js/**/*.js',
        tasks: ['concat']
      },
      images: {
        files: ['src/images/**/*', 'src/index.html'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy']);
};
