var gulp = require('gulp'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rigger = require('gulp-rigger'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),

	path = {
		src : 'src',
		build : 'build',
		bower : 'bower_components'
	};

gulp.task('clean', function(cb){
	rimraf(path.build, cb);
});

gulp.task('copy', ['clean'], function(){
	gulp.src([path.src + '/*',
		'!' + path.src + '/html'])
		.pipe(gulp.dest(path.build + '/'))
});

gulp.task('html', ['clean'], function(){
	gulp.src(path.src + '/html/*.html')
		.pipe(rigger())
		.pipe(gulp.dest(path.build + '/'))
});

gulp.task('styles', ['clean'], function(){
	return gulp.src(path.src + '/styles/styles.less')
		.pipe(less({
			paths : path.bower
		}))
		.pipe(autoprefixer({
			browsers : ['last 2 versions'],
			cascade : false
		}))
		.pipe(cleanCSS({compatibility : 'ie8'}))
		.pipe(gulp.dest(path.build + '/styles'));
});

gulp.task('js', ['clean'], function(){
	return gulp.src(path.src + '/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.build + '/js'))
});

gulp.task('images', ['clean'], function(){
	return gulp.src(path.src + '/images/**/*.*')
		.pipe(gulp.dest(path.build + '/images'));
});

gulp.task('fonts', ['clean'], function(){
	return gulp.src(path.src + '/fonts/**/*')
		.pipe(gulp.dest(path.build + '/fonts'));
});

gulp.task('default', [
	'copy',
	'html',
	'styles',
	'js',
	'images',
	'fonts'
]);