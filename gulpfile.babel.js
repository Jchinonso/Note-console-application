import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('babel', () =>
  gulp.src(['./**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.babel.js'])
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);