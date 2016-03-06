'use strict';


const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      del = require('del'),
      path = require('path')


// ------------------------------------------------------------

const config = require('./build.config')


// ------------------------------------------------------------

gulp.task('clean', done => {
  del([ 'build/**', 'dist/**' ]).then(done)
})


// ------------------------------------------------------------

gulp.task('templates', () => {
  return gulp.src(config.src.jade)
    .pipe($.changed(config.build.html, { extension: '.html' }))
    .pipe($.debug({ title: 'jade' }))
    .pipe($.jade(config.jade))
    .pipe(gulp.dest(config.build.html))
})


// ------------------------------------------------------------

gulp.task('styles', () => {
  return gulp.src(config.src.styl)
    .pipe($.changed(config.build.css, { extension: '.css' }))
    .pipe($.debug({ title: 'stylus' }))
    .pipe($.sourcemaps.init())
    .pipe($.stylus(config.stylus))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.build.css))
})


// ------------------------------------------------------------

gulp.task('scripts', () => {
  return gulp.src(config.src.js)
    .pipe($.changed(config.build.js))
    .pipe($.debug({ title: 'js' }))
    .pipe($.sourcemaps.init())
    .pipe($.babel(config.babel))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.build.js))
})


// ------------------------------------------------------------

gulp.task('assets', () => {
  return gulp.src(config.src.assets)
    // .pipe($.debug({ title: 'assets[all]', minimal: false }))
    .pipe($.changed(config.build.assets))
    .pipe($.debug({ title: 'assets' }))
    .pipe(gulp.dest(config.build.assets))
})


// ------------------------------------------------------------

gulp.task('vendor', () => {
  return gulp.src(config.src.vendor)
    // .pipe($.debug({ title: 'assets[all]', minimal: false }))
    .pipe($.changed(config.build.vendor))
    .pipe($.debug({ title: 'vendor' }))
    .pipe(gulp.dest(config.build.vendor))
})


// ------------------------------------------------------------

gulp.task('locales', () => {
  return gulp.src(config.src.locales)
    // .pipe($.debug({ title: 'assets[all]', minimal: false }))
    .pipe($.changed(config.build.locales))
    .pipe($.debug({ title: 'locales' }))
    .pipe(gulp.dest(config.build.locales))
})


// ------------------------------------------------------------

gulp.task('manifest', () => {
  return gulp.src(config.src.manifest)
    .pipe($.changed(config.build.dir))
    .pipe($.chromeManifest(config.chromeManifest))
    .pipe($.ignore.exclude('**/*.{js,css}'))
    .pipe($.debug({ title: 'manifest' }))
    .pipe(gulp.dest(config.build.dir))
})

// ------------------------------------------------------------

gulp.task('watch', [ 'build' ], () => {
  gulp.watch(config.watch.styl,      [ 'styles', 'manifest' ])
  gulp.watch(config.watch.js,        [ 'scripts', 'manifest' ])
  gulp.watch(config.watch.html,      [ 'templates', 'manifest' ])
  gulp.watch(config.watch.assets,    [ 'assets', 'manifest' ])
  gulp.watch(config.watch.vendor,    [ 'vendor', 'manifest' ])
  gulp.watch(config.watch.locales,   [ 'locales', 'manifest' ])
  gulp.watch(config.src.manifest,    [ 'manifest' ])
})


// ------------------------------------------------------------

gulp.task('build', [ 'styles', 'scripts', 'templates', 'assets', 'vendor', 'locales', 'manifest' ])


gulp.task('default', [ 'build' ])
