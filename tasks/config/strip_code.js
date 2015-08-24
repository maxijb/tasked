/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

	grunt.config.set('strip_code', {
			compile: {
		      // a list of files you want to strip code from
		      src: '.tmp/public/static/**/*.js'
		    }
	});

	grunt.loadNpmTasks('grunt-strip-code');
};
