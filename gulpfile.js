const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglifycss = require('gulp-uglifycss');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const { src, dest } = require('gulp');
const concat = require('gulp-concat');

//bundle css
const cssBundle = () =>
  src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'assets/css/style.css',
  ])
    .pipe(concat('style.css'))
    .pipe(dest('dist/assets/css'));

//bundle JavaScript
const jsBundle = () =>
  src(['assets/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(dest('dist/assets/js'));

//minify html
function minify() {
  return gulp
    .src(['./*.html', './pages/*.html'], { base: './' })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(['dist']));
}

//uglify JavaScript
function es() {
  return gulp
    .src('./assets/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/assets/js'));
}
exports.default = es;

//updates css when new scss code is written
function style() {
  return gulp
    .src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

//runs browser-sync and launches chrome as default browser
function watch() {
  browserSync.init({
    browser: 'google chrome',
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./assets/sass/**/*.scss', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
}

//minify CSS
async function mincss() {
  gulp
    .src('./assets/css/**/*.css')
    .pipe(
      uglifycss({
        uglyComments: true,
      })
    )
    .pipe(gulp.dest('dist/assets/css'));
}

exports.style = style;
exports.watch = watch;
exports.mincss = mincss;
exports.es = es;
exports.minify = minify;
exports.cssBundle = cssBundle;
exports.jsBundle = jsBundle;
