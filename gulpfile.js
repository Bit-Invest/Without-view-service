
  const gulp = require('gulp');
  const sass = require('gulp-sass');
  const concat = require('gulp-concat');
  const minifyCSS = require('gulp-cssmin');
  const autoprefixer = require('gulp-autoprefixer');

  gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer(
        {
          browsers: ['> 1%', 'last 4 versions'],
          cascade: false
        }))
      .pipe(concat('app.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./src/css'));
  });

  gulp.task('default', ['styles'], function() {
    gulp.watch('src/**/*.scss', function() {
      gulp.run('styles');
    });
  });
