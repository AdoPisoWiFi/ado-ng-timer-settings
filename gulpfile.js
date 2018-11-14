const { task, src, dest, start, series } = require('gulp')
const concat = require('gulp-concat')
const ngTemplates = require('gulp-angular-templatecache')
const del = require('del')

function clean() {
  return del([
    'dist'
  ]);
}

function templates() {
  return src('./src/**/*.html')
    .pipe(ngTemplates({
      module: 'ado.timer-settings.tpls',
      standalone: true
    }))
    .pipe(dest('.tmp'))
}

function build() {
  return src(['.tmp/**/*.js', 'src/**/*.js'])
    .pipe(concat('ado-ng-timer-settings.js'))
    .pipe(dest('./dist'))
}

task('default', series(clean, templates, build))


