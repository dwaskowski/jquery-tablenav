'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('tablenav.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '<%= pkg.docs ? "* " + pkg.docs + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
      '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n*/\n\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    coffee: {
      compile: {
        files: {
          'src/tablenav.js': 'src/tablenav.coffee'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
	copy: {
		images: {
			expand: true,
			cwd: 'src/',
			src: ['img/**/*.png','img/**/*.jpg'],
			dest: 'dist/',
		},
	},
	json_generator: {
    target: {
        dest: "bower.json",
        options: {
            name: '<%= pkg.name %>',
            version: '<%= pkg.version %>',
            description: '<%= pkg.description %>',
            keywords: '<%= pkg.keywords %>',
			dependencies: '<%= pkg.dependencies %>',
			authors: '<%= pkg.authors %>',
			licenses: '<%= pkg.licenses %>',
			homepage: '<%= pkg.homepage %>',
			main: 'dist/jquery.<%= pkg.name %>.js',
			
        }
    },
}
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-json-generator');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['coffee', 'jshint', 'qunit', 'clean', 'concat', 'uglify', 'copy', 'json_generator']);

};
