'use strict';

/**/
/*
var config = {
    host: '192.168.0.21',
    port: 22,
    username: 'iojs',
    privateKey: fs.readFileSync('/Users/zensh/.ssh/id_rsa')
};
*/

var gulp        = require('gulp'),
    concatCss   = require('gulp-concat-css'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require("gulp-rename"),
    notify      = require("gulp-notify"),
    through     = require('gulp-through'),
    sass        = require('gulp-sass'),
    uncss       = require('gulp-uncss'),
    autoprefixer= require('gulp-autoprefixer'),
    jsdoc       = require("gulp-jsdoc"),
    uglify      = require('gulp-uglifyjs'),
    refresh     = require('gulp-livereload'),
    shell       = require('gulp-shell'),
    svgo        = require('svgo'),
    lr          = require('tiny-lr'),
    svgSprite   = require("gulp-svg-sprites"),
    GulpSSH     = require('gulp-ssh'),
/*
    gulpSSH     = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config
    }),
*/
    yaml = require('gulp-yaml'),
    server      = lr();

/**/
/*
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
 });
*/


/**/
gulp.task('default', ['min-css', 'min-js']);

/**/
gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

/**/
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
/**/
gulp.task('uncss', function () {
    return gulp.src('cdn/bundle.min.css')
        .pipe(uncss({
            //html: ['index.html', 'posts/**/*.html', 'http://example.com']
            html: ['test.html']
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

/**/
gulp.task('jsdoc',function() {
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

/**/
gulp.task('min-js', function() {
    gulp.src([  'js/bower_components/jquery/dist/jquery.js',
                'js/bower_components/underscore/underscore.js',
                'js/bower_components/backbone/backbone.js',
                //'js/bower_components/backbone-localstorage/backbone-localstorage.js',
                //'js/app/collections/*.js',  //  collections backbone
                //'js/app/models/*.js',       //  models
                //'js/app/views',             //  views
                'js/bower_components/kjur/jsrsasign/jsrsasign-latest-all-min.js',
                //'js/app/app.js'             //  init
    ])
        .pipe(uglify())
        .pipe(rename("getiss.min.js"))
        .pipe(gulp.dest('cdn/'))
        .pipe(notify({
                message: "Generated file: <%= file.relative %> @ <%= options.date %>",
                templateOptions: {
                    date: new Date()
                }
            }
        ))
});

/**/
gulp.task('phpdoc', shell.task(['vendor/bin/phpdoc -d . -t docs/phpdoc -i vendor/,node_modules/,server.php']));

/**/
gulp.task('watch', function () {
    gulp.watch(['min-css', 'min-js']);
});

gulp.task('sprites', function () {
    return gulp.src('img/svg/*.svg')
        .pipe(svgSprite({
            cssFile: "../scss/includes/_sprite.scss",
            layout: 'diagonal'
        }))
        .pipe(gulp.dest("cdn/"))
        .pipe(notify({
                message: "SVG sprite  create : <%= file.relative %> @ <%= options.date %>",
                templateOptions: {
                    date: new Date()
                }
            }
        ));
});

/**/
gulp.task('pngSprite', ['svgSprite'], function() {
    return gulp.src(basePaths.dest + paths.sprite.svg)
        .pipe(plugins.svg2png())
        .pipe(gulp.dest(paths.images.dest));
});

/**/
gulp.task('sprite', ['pngSprite']);

/**/
gulp.task('exec', function () {
    return gulpSSH
        .exec(['uptime', 'ls -a', 'pwd'], {filePath: 'commands.log'})
        .pipe(gulp.dest('logs'))
});
/**/
gulp.task('yml', function () {
    return gulp.src('/var/www/phalcon/app/config/*.yml')
        .pipe(yaml({ space: 2 }))
        .pipe(gulp.dest('./json/'))
});