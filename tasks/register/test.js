module.exports = function (grunt) {
	grunt.registerTask('test', [
		'clean:dev',
		'copy:dev',
		'run:test'
	]);
};
