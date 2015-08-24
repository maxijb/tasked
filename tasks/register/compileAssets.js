module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'strip_code:compile',
		'browserify:dist',
	    'jade:compile',
	    'jade:viewsCompile'
	]);
};
