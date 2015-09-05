module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'copy:dev',
		'less:dev',
		'strip_code:compile',
		'browserify:dist',
	    'jade:compile',
	    'jade:viewsCompile'
	]);
};
