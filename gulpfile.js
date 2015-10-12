'use strict';

var gulp        = require('gulp');
var concatCss   = require('gulp-concat-css');
var minifyCss   = require('gulp-minify-css');
var rename      = require("gulp-rename");
var notify      = require("gulp-notify");
var through     = require('gulp-through');
var sass        = require('gulp-sass');
var uncss       = require('gulp-uncss');
var autoprefixer= require('gulp-autoprefixer');
var jsdoc       = require("gulp-jsdoc");
var uglify      = require('gulp-uglifyjs');
var refresh     = require('gulp-livereload');
var lr          = require('tiny-lr');
var server      = lr();

gulp.task('default', ['min-css', 'min-js']);

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('min-css', function () {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("getiss.min.css"))
        .pipe(notify({
            message: "Generated file: <%= file.relative %> @ <%= options.date %>",
            templateOptions: {
                date: new Date()
            }
        }
        ))
        .pipe(gulp.dest('cdn/'));
});

// delete not used css classes , ids, tags
gulp.task('uncss', function () {
    return gulp.src('cdn/bundle.min.css')
        .pipe(uncss({
            //html: ['index.html', 'posts/**/*.html', 'http://example.com']
            html: ['index.html']
        }))
        .pipe(notify({
                message: "Delete not used css classes , ids, tagse: <%= file.relative %> @ <%= options.date %>",
                templateOptions: {
                    date: new Date()
                }
            }
        ))
        .pipe(gulp.dest('cdn/'));
});

gulp.task('jsdoc',function(){
    gulp.src("js/app/*.js")
        .pipe(jsdoc('./doc'))
        .pipe(notify({
                message: "Js documentations create : <%= file.relative %> @ <%= options.date %>",
                templateOptions: {
                    date: new Date()
                }
            }
        ))
});

gulp.task('min-js', function() {
    gulp.src([  'js/bower_components/jquery/dist/jquery.js',
                'js/bower_components/underscore/underscore.js',
                'js/bower_components/backbone/backbone.js',
                'js/app/home.js'
    ])
        .pipe(uglify())
        .pipe(rename("getiss.min.js"))
        .pipe(gulp.dest('cdn/'))
});