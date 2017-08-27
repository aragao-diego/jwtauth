module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var appConfig = {
    app: require('./bower.json').appPath || 'src',
    dist: 'dist',
    temp: 'tmp',
    module: 'da-jwtauth'
  };

  // Configure Grunt
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['./app/'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['**/*.js', '**/*.html'],
        options: {
          livereload: true
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.temp %>',
          src: [ '**']
        }]
      },
      statics: {
        files: [{
            expand: true,
            dot: true,
            flatten: true,
            cwd: '<%= yeoman.temp %>',
            dest: '<%= yeoman.dist %>/img',
            src: [ '**/*.gif', '**/*.jpeg', '**/*.png']
          }
        ]
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },

     // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    },

    //e2e
    protractor: {
      options: {
        noColor: false,
        args: { }
      },
      e2e: {
        options: {
          configFile: "e2e/protractor.conf.js",
          // Stops Grunt process if a test fails
          keepAlive: false,
          //debug: true
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.temp %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.temp %>'
        }]
      }
    },

    processhtml: {
      options: {
        process: true
      },
      dist: {
        files: {
          'dist/index.html': ['dist/index.html']
        }
      }
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.temp %>',
          src: 'assets/**/*.css',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },


    concat: {
      options: {
        banner: '(function(){\n\'use strict\'\n',
        footer: '\n})();'
      },
      dist: {
        src: ['<%= yeoman.temp %>/*.js', '<%= yeoman.temp %>/*/*.js'],
        dest: '<%= yeoman.dist %>/<%= yeoman.module %>.js'
      },
      assets: {
        options:{
          banner: '',
          footer: ''
        },
        src: ['<%= yeoman.temp %>/**/*.css'],
        dest: '<%= yeoman.dist %>/<%= yeoman.module %>.css'
      },
      views: {
        options:{
          banner: '',
          footer: ''
        },
        src: ['<%= yeoman.temp %>/**/*.html'],
        dest: '<%= yeoman.dist %>/<%= yeoman.module %>.html'
      }
    },

    ngAnnotate: {
        options: {
        },
        dist: {
            files: [
              {
                expand: true,
                src: ['<%= yeoman.temp %>/**/*.js']
              }
            ]
        },
    },


    uglify: {
      options: {
        mangle: false,
        banner: '(function(){\n\'use strict\'\n',
        footer: '\n})();'
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/<%= yeoman.module %>.min.js': ['<%= yeoman.temp %>/*.js', '<%= yeoman.temp %>/*/*.js']
        }
      }
    },

    clean: {
      temp: ["<%= yeoman.temp %>/"]
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist/'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    }

  });


  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });
  // Creates the `server` task
  grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
  ]);

  grunt.registerTask('build',[
    // 'test',
    'copy:dist',
    'copy:statics',
    'ngAnnotate:dist',
    'htmlmin:dist',
    'concat:dist',
    'concat:assets',
    'concat:views',
    'uglify:dist',
    'clean:temp'
  ]);

  grunt.registerTask('default', [
    'build',
    'test'
  ]);

  grunt.registerTask('test', [
    //'clean:server',
    //'concurrent:test',
    //'autoprefixer',
    //'connect:test',
    'karma'
  ]);

  grunt.registerTask('e2e', [
    'protractor:e2e'
  ]);
};
