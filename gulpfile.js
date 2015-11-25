'use strict';


const gulp = require('gulp'),
      $ = require('gulp-load-plugins')()


// ------------------------------------------------------------


gulp.task('styles', function() {
  return gulp.src('src/styles/**/!(_)*.styl')
    .pipe($.stylus({
      use: [ 'nib' ]
    }))
    .pipe(gulp.dest('dist/css'))
})


gulp.task('build', [ 'styles' ])


gulp.task('default', [ 'build' ])
