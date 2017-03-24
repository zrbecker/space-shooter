module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        seperator: ';\n'
      },
      dist: {
        src: [ 'src/js/main/*.js' ],
        dest: 'dist/js/main.js'
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/', src: 'images/**', dest: 'dist/' },
          { expand: true, cwd: 'src/', src: 'index.html', dest: 'dist/' }
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

  grunt.registerTask('default', ['concat', 'copy']);
};
