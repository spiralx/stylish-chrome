'use strict';


const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      del = require('del'),
      path = require('path')


// ------------------------------------------------------------

const config = require('./build.config')


// ------------------------------------------------------------

gulp.task('clean', done => {
  del([ 'dist/**' ]).then(done)
})


// ------------------------------------------------------------

gulp.task('templates', () => {
  return gulp.src(config.src.jade)
    .pipe($.changed(config.dist.html, { extension: '.html' }))
    .pipe($.debug({ title: 'jade' }))
    .pipe($.jade(config.jade))
    .pipe(gulp.dest(config.dist.html))
})


// ------------------------------------------------------------

gulp.task('styles', () => {
  return gulp.src(config.src.styl)
    .pipe($.changed(config.dist.css, { extension: '.css' }))
    .pipe($.debug({ title: 'stylus' }))
    .pipe($.sourcemaps.init())
    .pipe($.stylus(config.stylus))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist.css))
})


// ------------------------------------------------------------

gulp.task('scripts', () => {
  return gulp.src(config.src.js)
    .pipe($.changed(config.dist.js))
    .pipe($.debug({ title: 'js' }))
    .pipe($.sourcemaps.init())
    .pipe($.babel(config.babel))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist.js))
})


// ------------------------------------------------------------

gulp.task('assets', () => {
  return gulp.src(config.src.assets)
    // .pipe($.debug({ title: 'assets[all]', minimal: false }))
    .pipe($.changed(config.dist.assets))
    .pipe($.debug({ title: 'assets' }))
    .pipe(gulp.dest(config.dist.assets))
})


// ------------------------------------------------------------

gulp.task('watch', ['build'], () => {
  gulp.watch(config.watch.styl,      [ 'styles' ])
  gulp.watch(config.watch.js,        [ 'scripts' ])
  gulp.watch(config.watch.html,      [ 'templates' ])
  gulp.watch(config.watch.assets,    [ 'assets' ])
})


// ------------------------------------------------------------

gulp.task('build', [ 'styles', 'scripts', 'templates', 'assets' ])


gulp.task('default', [ 'build' ])
