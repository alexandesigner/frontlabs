// ========================================================================== //
//   Global require
// ========================================================================== //
(function (require) {

  // Variables =============== //
  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      bower = require('bower'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      minifyCss = require('gulp-minify-css'),
      rename = require('gulp-rename'),
      sh = require('shelljs'),
      templateCache = require('gulp-angular-templatecache');

  // Assets Paths
  var paths = {
    sass: ['./scss/**/*.scss'],
    templatecache: ['./www/templates/**/*.html']
  };

  // Template Cache
  gulp.task('templatecache', function (done) {
      gulp.src('./www/templates/**/*.html')
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
    });

  // Sass
  gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
  });

  // Bower Install (ionic install) =============== //
  gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
      .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
  });

  // Git Check =============== //
  gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
      console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
      );
      process.exit(1);
    }
    done();
  });

  // Obseravator =============== //
  gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templatecache, ['templatecache']);
  });

  // Run tasks =============== //
  gulp.task('default', ['sass', 'templatecache']);

}(require));
