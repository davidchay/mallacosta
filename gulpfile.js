var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	cssmin = require('gulp-cssmin'),
	pug = require('gulp-pug');

var path={
	dev:{
		css:'./builds/desarrollo/css/',
		js:'./builds/desarrollo/js/',
		html:'./builds/desarrollo/',
		images:'./builds/desarrollo/images/'
	},
	dist:{
		css:'./builds/produccion/css',
		js:'./builds/produccion/js',
		html:'./builds/produccion/',
		images:'./builds/produccion/images/'
	},
	component:{
		scss:'./componentes/scss/**/*.scss',
		js:'./componentes/js/**/*.js',
		pug:'./componentes/pug/*.pug',
		images:'./componentes/images/'
	}
};

gulp.task('test',function(){
	gutil.log("Esto es un test");
});

gulp.task('sass',function(){
	gulp.src(path.component.scss)
	.pipe(sass({
		outputStyle:'expanded',
		 errLogToConsole: true

	}))
	.pipe(autoprefixer({
		version:['last 2']
	}))
	.pipe(concat('style.css'))
	.pipe(gulp.dest(path.dev.css))
	.pipe(connect.reload())
	.pipe(cssmin())
	.pipe(rename({
		suffix:".min"
	}))
	.pipe(gulp.dest(path.dist.css));
});


gulp.task('js',function(){
	gulp.src(path.component.js)
	.pipe(concat('script.js',{newLine:';'}))
	.pipe(gulp.dest(path.dev.js))
	.pipe(connect.reload())
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest(path.dist.js));
});

gulp.task('pug',function(){
	gulp.src(path.component.pug)
	.pipe(pug({
		pretty:true
	}))
	.pipe(gulp.dest(path.dev.html))
	.pipe(connect.reload())
	.pipe(gulp.dest(path.dist.html));
});

gulp.task('connect',function(){
	connect.server({
		root:'./builds/desarrollo/',
		port:8080,
		livereload:true
	});
});

gulp.task('watch',function(){
	gulp.watch(path.component.scss,['sass']);
	gulp.watch(path.component.js,['js']);
	gulp.watch(path.component.pug,['pug']);
});

gulp.task('default',['js','sass','pug','connect','watch']);