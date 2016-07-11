/**
 * Created by a.korotaev on 11.07.16.
 */
var gulp = require('gulp');
var uglify =  require('gulp-uglify');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var autoprifexer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var bower = require('gulp-bower');

var SCRIPTS_PATH = 'src/scripts/**/*.js';
var CSS_PATH = 'src/styles/**/*.css';
gulp.task('scripts', function () {
    gulp.src('src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(livereload());
});

gulp.task('styles', function () {
    gulp.src('src/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprifexer())
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(livereload());
});

gulp.task('scss', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprifexer())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(livereload());
});


gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('bower', function() {
    return bower('./bower_components')
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('serve',['scripts', 'styles', 'html', 'scss', 'bower'], function () {
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(CSS_PATH, ['styles']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
});