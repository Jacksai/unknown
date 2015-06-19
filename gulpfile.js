(function () {
	'use strict';
	
	// gulp
	var gulp = require('gulp');

	//plugins
	var connect = require('gulp-connect');
	var jshint = require('gulp-jshint');
	var uglify = require('gulp-uglify');
	var minifyCSS = require('gulp-minify-css');
	var sass = require('gulp-sass');
	var clean = require('gulp-clean');

	//tasks

	gulp.task('lint', function(){
		gulp.src(['gulpfile.js','./app/**/*.js', '!./app/bower_components/**'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));
	});

	gulp.task('clean', function(){
		gulp.src('./dist/*')
			.pipe(clean({force: true}));
	});

	gulp.task('sass', function(){
		gulp.src('./app/sass/main.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./app'));

	});

	gulp.task('minify-css', function(){
		var opts = {comments: true, spare:true};
		gulp.src('./app/main.css')
			.pipe(minifyCSS(opts))
			.pipe(gulp.dest('./dist/'));
	});

	gulp.task('minify-js', function(){
		gulp.src(['./app/**/*.js','!./app/bower_components/**'])
			.pipe(uglify({
				//inSourceMap:
				//outSourceMap: 'app.js.map'
			}))
			.pipe(gulp.dest('./dist/'));
	});

	gulp.task('copy-bower-components', function(){
		 gulp.src('./app/bower_components/**')
    		.pipe(gulp.dest('dist/bower_components'));
	});

	gulp.task('copy-html', function(){
		gulp.src('./app/**/*.html')
    		.pipe(gulp.dest('dist/'));
	});

	gulp.task('connect', function(){
		connect.server({
			root: 'app/',
			port: 8888
		});
	});

	gulp.task('connectDist', function() {
		connect.server({
			root: 'dist/',
			port: 9999
		});
	});

	//default tast
	gulp.task('default', ['lint','sass', 'connect']);

	//build task
	gulp.task('build', ['lint', 'sass', 'minify-css', 'minify-js', 'copy-html', 'copy-bower-components', 'connectDist']);


})();