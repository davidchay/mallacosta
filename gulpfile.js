var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	cssmin = require('gulp-cssmin'),
	imageop = require('gulp-image-optimization');


var path={
	dev:{
		scss:{
			style:'./dev/scss/style/**/*.scss', //work
			custom:'./dev/scss/*.scss'
		},
		css:'./dev/css/', //output
		cssStyle:'./dev/css/style.css',
		cssMalla:'./dev/css/mallacosta.css',
		libs:'./dev/libs-js/*.js', //work
		scriptLibs:'./dev/js/script.js',
		script:'./dev/js/mallacosta.js',
		js:'./dev/js/', //output
		html:'./dev/*html', //work
		images:'./dev/images/' //
	},
	dist:{
		css:'./dist/css/', //output
		js:'./dist/js/', //output
		html:'./dist/', //output
		images:'./dist/images/', //output
		dataImage:'.dist/data/img/', //output
	}
};

gulp.task('dist', async function(){
	gulp.src(path.dev.cssMalla)
	.pipe(cssmin())
	.pipe(gulp.dest(path.dist.css));

	gulp.src(path.dev.cssStyle)
	.pipe(cssmin())
	.pipe(gulp.dest(path.dist.css));

	gulp.src(path.dev.script)
	.pipe(uglify())
	.pipe(gulp.dest(path.dist.js));

	gulp.src(path.dev.scriptLibs)
	.pipe(uglify())
	.pipe(gulp.dest(path.dist.js));

	gulp.src(['./dev/images/**/*.png','./dev/images/**/*.jpg','./dev/images/**/*.gif','./dev/images/**/*.jpeg'])
	.pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./dist/images/'));

    gulp.src(['./dev/data/img/**/*.png','./dev/data/img/**/*.jpg','./dev/data/img/**/*.gif','./dev/data/img/**/*.jpeg'])
	.pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./dist/data/img/'));

});

gulp.task('style', async function(){
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
	.pipe(connect.reload());

});

gulp.task('custom', async function() {
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
	.pipe(connect.reload());


});


gulp.task('js', async function(){
	gulp.src(path.dev.libs)
	.pipe(concat('script.js',{newLine:';'}))
	.pipe(gulp.dest(path.dev.js))
	.pipe(connect.reload());

});

gulp.task('html', async function(){
	gulp.src(path.dev.html)
	.pipe(gulp.dest(path.dist.html))
	.pipe(connect.reload());
});

/*
gulp.task('script',function(){
	gulp.src(path.dev.script)
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest(path.dist.js))
	.pipe(connect.reload());
});*/




gulp.task('connect', async function(){
	connect.server({
		root:'./dev/',
		port:8000,
		livereload:true
	});
});

gulp.task('watch', async function(){
	gulp.watch(path.dev.scss.style, gulp.series ('style'));
	gulp.watch(path.dev.scss.custom, gulp.series ('custom'));
	gulp.watch(path.dev.libs, gulp.series('js'));

	gulp.watch(path.dev.html, gulp.series ('html'));
});

gulp.task('default', gulp.series('js','style','custom','html','connect','watch'));
