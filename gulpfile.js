const autoprefixer = require('gulp-autoprefixer'),
      babel        = require('gulp-babel'),
      browserify   = require('gulp-browserify'),
      concat       = require('gulp-concat'),
      connect      = require('gulp-connect'),
      del          = require('del'),
      gulp         = require('gulp'),
      less         = require('gulp-less'),
      minifyCSS    = require('gulp-minify-css'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      sequence     = require('gulp-sequence'),
      open         = require('gulp-open'),
      imagemin     = require('gulp-imagemin')

/* clean */
gulp.task('clean', () => {
  return (
    del('./dist/**/*')
  )
})

/* html */
gulp.task('html', () => {
  return (
    gulp.src(['./src/html/**/*'])
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload())
  )
})

/* js */
gulp.task('js', () => {
  return (
    gulp.src('./src/js/app.js')
        .pipe(babel())
        .pipe(browserify({
          transform: ['babelify']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
  )
})

/* jsVendor */
gulp.task('jsVendor', () => {
  return (
    gulp.src([
          './src/js/vendor/jquery-1.9.1.min.js',
          './src/js/vendor/bootstrap.min.js',
          './src/js/vendor/bootstrap-table.min.js',
          './src/js/vendor/bootstrap-table-zh-CN.min.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js/'))
  )
})

/* css */
gulp.task('css', () => {
  return (
    gulp.src('./src/css/**/*.css')
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/css/'))
  )
})

/* less */
gulp.task('less', () => {
  return (
    gulp.src('./src/less/app.less')
        .pipe(less())
        .pipe(autoprefixer({
          browsers: ['> 0.01%']
         }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
  )
})

/* font */
gulp.task('font', () => {
  return (
    gulp.src('./src/font/**')
        .pipe(gulp.dest('./dist/font'))
  )
})

/* img */
gulp.task('img', () => {
  return (
    gulp.src('./src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
  )
})

/* server */
gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

/* open browser */
gulp.task('open', () => {
  gulp.src(__filename)
      .pipe(open({
        uri: 'http://localhost:8080'
      }))
})

/* watch */
gulp.task('watch', () => {
  gulp.watch('./src/less/**/*.less', ['less'])
  gulp.watch('./src/js/**/*.js', ['js'])
  gulp.watch(['./src/html/**/*.html'], ['html'])
})

/* default */
gulp.task('default', ['clean'], () => {
  sequence('html','jsVendor', 'js', 'css', 'less', 'font', 'img', 'connect', 'open', 'watch')()
})