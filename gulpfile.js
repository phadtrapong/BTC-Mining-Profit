const gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

function minifyJs() {
    return gulp.src('script.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
}

function minifyCss(){
    return gulp.src('*.css')
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist/'));
}

function copyHtmlAndImagesToDist() {
    return gulp.src(['index.html', 'bitcoin.png'], { base: './' })
        .pipe(gulp.dest('dist'));
};

exports.default = gulp.series(minifyCss, minifyJs, copyHtmlAndImagesToDist);
