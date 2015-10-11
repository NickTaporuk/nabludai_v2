var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var through = require('gulp-through');
gulp.task('minify-css', function () {
    return gulp.src('css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("bundle.min.css"))
        .pipe(notify({
            message: "Generated file: <%= file.relative %> @ <%= options.date %>",
            templateOptions: {
                date: new Date()
            }
        }
        ))
        .pipe(gulp.dest('cdn/'))
        .pipe(through(function () {
            this.emit("error", new Error("Something happend: Error message!"))
        }))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }));
});