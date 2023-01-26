// see video explanation: https://youtu.be/ubHwScDfRQA
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass')); // This is different from the video since gulp-sass no longer includes a default compiler. Install sass as a dev dependency `npm i -D sass` and change this line from the video.
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = import('gulp-imagemin');
const imagewebp = require('gulp-webp');
const copy = require('gulp-copy');

//compile, prefix, and min scss
function compilescss() {
    return src('src/scss/*.scss') // change to your source directory
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(dest('dist/css')) // change to your final/public directory
};

//optimize and move images
function optimizeimg() {
    return src('src/images/*.{jpg,png}') // change to your source directory
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
	        imagemin.optipng({optimizationLevel: 2})
        ]))
        .pipe(dest('dist/images')) // change to your final/public directory
};

// minify js
function jsmin() {
    return src('src/js/*.js') // change to your source directory
        .pipe(terser())
        .pipe(dest('dist/js')); // change to your final/public directory
};

//watchtask
function watchTask() {
    watch('src/scss/**/*.scss', compilescss); // change to your source directory
    watch('src/js/*.js', jsmin); // change to your source directory
};

function copyBootstrapFunction() {
    return src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(copy('dist/js', { prefix: 4 }))
}

function copyPopperjsFunction() {
    return src(['node_modules/@popperjs/core/dist/umd/popper.min.js'])
        .pipe(copy('dist/js', { prefix: 5 }))
}

// Default Gulp task 

exports.default = series(
    compilescss,
    jsmin,
    copyBootstrapFunction,
    copyPopperjsFunction,
    watchTask
);
