'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , less = require('gulp-less')
  , concat = require('gulp-concat')
  , path = require('path')
  , livereload = require('gulp-livereload')
  , watch = require('gulp-watch')
  ;

gulp.task('default', function () {

  gulp.run('less');
  gulp.run('concat');
  gulp.run('copy');


  gulp.watch('./assets/app/**/*.js', function () {
    gulp.run('concat-js');
  });

  gulp.watch('./assets/app/**/*.html', function () {
    gulp.run('copy');
  });

  gulp.watch('./assets/less/**/*.less', function () {
    gulp.run('less');
  });

  gulp.run('watch');
});

gulp.task('less', function () {
  gulp.src('./assets/less/**/*.less')
    .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('copy', function () {
  gulp.src('./assets/imgs/**')
    .pipe(gulp.dest('./public/imgs'));

  gulp.src('./assets/app/templates/**/*.html')
    .pipe(gulp.dest('./public/templates'));
});

gulp.task('concat', ['concat-js', 'concat-libs']);

gulp.task('concat-js', function () {
  gulp.src('./assets/app/**/*.js')
    .pipe(concat("app.js"))
    .pipe(gulp.dest('./public/js/'))
});

var libs = [
  "./assets/libs/jquery/jquery.js",
  "./assets/libs/redactor/redactor.js",
  "./assets/libs/angular/angular.js",
  "./assets/libs/angular-route/angular-route.js",
  "./assets/libs/angular-redactor/angular-redactor.js",
  "./assets/libs/angular-bootstrap/ui-bootstrap-tpls.js"
];

gulp.task('concat-libs', function () {
  gulp.src(libs)
    .pipe(concat("libs.js"))
    .pipe(watch({ tasks: ['concat-libs']}))
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('watch', function () {
  var server = livereload();
  gulp.watch('./public/**/*', function (evt) {
    server.changed(evt.path);
  });
});
