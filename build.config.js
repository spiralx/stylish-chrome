

module.exports = {
  src: {
    js:         'src/scripts/**/*.js',
    styl:       'src/styles/**/!(_)*.styl',
    jade:       'src/templates/**/!(_)*.jade',
    assets:     'src/assets/**/*.*',
    vendor:     'vendor/**/*.*',
    locales:    'src/_locales/**/*.*',
    manifest:   'src/manifest.json'
  },

  watch: {
    js:         'src/scripts/**.js',
    styl:       'src/styles/**.styl',
    jade:       'src/templates/**.jade',
    assets:     'src/assets/**.*',
    vendor:     'vendor/**.*',
    locales:    'src/_locales/**.*'
  },

  build: {
    js:         'build/scripts',
    css:        'build/styles',
    html:       'build',
    assets:     'build',
    vendor:     'build/vendor',
    locales:    'build/_locales',
    dir:        'build'
  },

  dist: {
    dir:        'dist'
  },

  jade: {
    pretty: true,
    locals: {}
  },

  stylus: {
    use: [
      require('nib')
    ],
    paths: [
      'src/styles',
      'src/assets/images'
    ]
  },

  babel: {
    presets: [ 'es2015' ]
  },

  chromeManifest: {
    buildnumber: true
  }
}
