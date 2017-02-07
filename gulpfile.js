var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	cssmin = require('gulp-cssmin');


var path={
	dev:{
		scss:{
			style:'./dev/scss/style/**/*.scss', //work
			custom:'./dev/scss/*.scss'
		},
		css:'./dev/css/', //output
		libs:'./dev/libs-js/*.js', //work
		script:'./dev/js/mallacosta.js',
		js:'./dev/js/', //output
		html:'./dev/*html', //work
		images:'./dev/images/' //
	},
	dist:{
		css:'./dist/css/', //output
		js:'./dist/js/', //output
		html:'./dist/', //output
		images:'./dist/images/' //output
	}
};

gulp.task('test',function(){
	gutil.log("Esto es un test");
});

gulp.task('style',function(){
	gulp.src(path.dev.scss.style)
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

gulp.task('custom',function(){
	gulp.src(path.dev.scss.custom)
	.pipe(sass({
		outputStyle:'expanded',
		 errLogToConsole: true
	}))
	.pipe(autoprefixer({
		version:['last 2']
	}))
	.pipe(concat('mallacosta.css'))
	.pipe(gulp.dest(path.dev.css))
	.pipe(connect.reload())
	.pipe(cssmin())
	.pipe(rename({
		suffix:".min"
	}))
	.pipe(gulp.dest(path.dist.css));

});


gulp.task('js',function(){
	gulp.src(path.dev.libs)
	.pipe(concat('script.js',{newLine:';'}))
	.pipe(gulp.dest(path.dev.js))
	.pipe(connect.reload())
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest(path.dist.js));
});

gulp.task('html',function(){
	gulp.src(path.dev.html)
	.pipe(gulp.dest(path.dist.html))
	.pipe(connect.reload());
});

gulp.task('script',function(){
	gulp.src(path.dev.script)
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest(path.dist.js))
	.pipe(connect.reload());
});

gulp.task('html',function(){
	gulp.src(path.dev.html)
	.pipe(gulp.dest(path.dist.html))
	.pipe(connect.reload());
});


gulp.task('connect',function(){
	connect.server({
		root:'./dev/',
		port:8000,
		livereload:true
	});
});

gulp.task('watch',function(){
	gulp.watch(path.dev.scss.style,['style']);
	gulp.watch(path.dev.scss.custom,['custom']);
	gulp.watch(path.dev.libs,['js']);
	gulp.watch(path.dev.script,['script']);
	gulp.watch(path.dev.html,['html']);
});

gulp.task('default',['js','style','custom','script','html','connect','watch']);
