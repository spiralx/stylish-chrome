

module.exports = {
  src: {
    js:         'src/scripts/**/*.js',
    styl:       'src/styles/**/!(_)*.styl',
    jade:       'src/templates/**/!(_)*.jade',
    assets:     'src/assets/**/*.*'
  },

  watch: {
    js:         'src/scripts/**.js',
    styl:       'src/styles/**.styl',
    jade:       'src/templates/**.jade',
    assets:     'src/assets/**.*'
  },

  dist: {
    js:         'dist/js',
    css:        'dist/css',
    html:       'dist',
    assets:     'dist'
  },

  jade: {
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
  }
}
