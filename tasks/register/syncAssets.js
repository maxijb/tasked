module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'sync:dev',
		'strip_code:compile',
		'browserify:dist',
		'jade:compile',
	    'jade:viewsCompile'
	]);
};
