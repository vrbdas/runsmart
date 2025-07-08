/* eslint-env node */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

// Очистка `dist`
gulp.task('clean', async function () {
  const { deleteAsync } = await import('del');
  await deleteAsync(['dist']);
});

// Компиляция SCSS
gulp.task('styles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Минификация HTML
gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Копирование PHP-файлов
gulp.task('php', function () {
  return gulp.src('src/*.php').pipe(gulp.dest('dist'));
});

// Копирование изображений
gulp.task('images', function () {
  return gulp.src('src/img/**/*', { encoding: false }).pipe(gulp.dest('dist/img'));
});

// Копирование SVG
gulp.task('svg', function () {
  return gulp.src('src/svg/**/*').pipe(gulp.dest('dist/svg'));
});

// Копирование шрифтов
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*', { encoding: false }).pipe(gulp.dest('dist/fonts'));
});

// Сборка Webpack
gulp.task('webpack', function (done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ colors: true, chunks: false }));
    browserSync.reload(); // Перезапуск BrowserSync после сборки
    done();
  });
});

// Запуск сервера и слежение за файлами
gulp.task(
  'server',
  gulp.series('webpack', function () {
    browserSync.init({
      server: { baseDir: 'dist' }, // если без php то так
      // proxy: "http://food.dev", // Адрес FlyEnv
      files: ['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js'],
      notify: false,
      open: false,
    });

    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.series('styles'));
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/*.php', gulp.series('php'));
    gulp.watch('src/img/**/*', gulp.series('images'));
    gulp.watch('src/svg/**/*', gulp.series('svg'));
    gulp.watch('src/fonts/**/*', gulp.series('fonts'));
    gulp.watch('src/js/**/*.js', gulp.series('webpack')); // Следим за изменениями JS и пересобираем Webpack
  })
);

// Сборка и запуск
gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('html', 'php', 'styles', 'images', 'svg', 'fonts', 'webpack'),
    'server'
  )
);
