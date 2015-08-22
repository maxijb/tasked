/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

	grunt.config.set('jade', {
		compile: {
          options: {

            client: false
          },

          expand: true,
          cwd: './assets/templates',
          src: ['**/*.jade'],
          dest: '.tmp/public/static/templates',
          ext: '.html'

        },

        viewsCompile:  {
          options: {
            client: false
          },

          expand: true,
          cwd: './views/',
          src: ['**/client/**/*.jade'],
          dest: '.tmp/public/static/templates',
          ext: '.html'

        }
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
};
