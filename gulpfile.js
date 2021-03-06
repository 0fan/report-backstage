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
      imagemin     = require('gulp-imagemin'),
      fileInclude  = require('gulp-file-include'),
      replace      = require('gulp-replace')

/* clean */
gulp.task('clean', () => {
  return (
    del('./dist/**/*')
  )
})

/* html */
gulp.task('html', () => {
  return (
    gulp.src([
          './src/html/**/*.html',
          '!./src/html/public/**/*.html',
          '!./src/html/template.html'
        ])
        .pipe(fileInclude({
          prefix: '@@',
          basepath: './src/html/public/'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload())
  )
})

/* favicon */
gulp.task('favicon', () => {
  return (
    gulp.src('src/html/favicon.ico')
        .pipe(gulp.dest('./dist/'))
  )
})

/* js */
gulp.task('js', () => {
  return (
    gulp.src([
          './src/js/app.js',
          './src/js/login.js',
          './src/js/role/**/*.js'
        ])
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
          './src/js/vendor/jquery.validate.min.js',
          './src/js/vendor/bootstrap.min.js',
          './src/js/vendor/bootstrap-table.min.js',
          './src/js/vendor/bootstrap-table-zh-CN.min.js',
          './src/js/vendor/bootstrap-table-export.js',
          './src/js/vendor/tableExport.js',
          './src/js/vendor/bootstrap-table-resizable.js',
          './src/js/vendor/colResizable-1.5.source.js'
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
    gulp.src([
        './src/less/app.less',
        './src/less/login/login.less'
        ])
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
        uri: 'http://localhost:8080',
        app: 'chrome'
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
  sequence('html','favicon', 'jsVendor', 'js', 'css', 'less', 'font', 'img', 'connect', 'open', 'watch')()
})