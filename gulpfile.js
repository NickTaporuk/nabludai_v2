'use strict';

var gulp        = require('gulp');
var concatCss   = require('gulp-concat-css');
var minifyCss   = require('gulp-minify-css');
var rename      = require("gulp-rename");
var notify      = require("gulp-notify");
var through     = require('gulp-through');
var sass        = require('gulp-sass');

gulp.task('minify-css', function () {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("bundle.min.css"))
        .pipe(notify({
            message: "Generated file: <%= file.relative %> @ <%= options.date %>",
            templateOptions: {
                date: new Date()
            }
        }
        ))
        .pipe(gulp.dest('cdn/'));
});

gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});