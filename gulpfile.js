const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
    notify: false,
    tunnel: true,
  });
}

function cleanPublic() {
  return del('public');
}

function images() {
  return src('src/images/**/*')
    .pipe(webp())
    .pipe(newer('src/images'))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest('src/images'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['src/js/main.js', '!src/js/main.min.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/style.scss')
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid: true,
      })
    )
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      'src/css/**/*.css',
      'src/fonts/**/*',
      'src/js/**/*.js',
      '!src/js/main.js',
      'src/**/index.html',
      'src/images/**/*',
    ],
    { base: 'src' }
  ).pipe(dest('public'));
}

function html() {
  return src('src/html/main.html')
    .pipe(fileInclude())
    .pipe(concat('index.html'))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('src'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/images/**/*'], images);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
  watch(['src/**/*.html', '!src/index.html'], html);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanPublic = cleanPublic;

exports.build = series(cleanPublic, build);
exports.default = parallel(
  html,
  images,
  styles,
  scripts,
  browsersync,
  watching
);
