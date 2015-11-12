var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

//GLOBAL TASKS
gulp.task('default', ['prod']);

gulp.task('ci', ['ci:lint', 'ci:test', 'ci:coverage'], function () {
  process.exit();
});

//production
gulp.task('prod', function () {
  nodemon({
    script: './src/index.js',
    ext: 'js',
    env: {
      NODE_ENV: 'production'
    }
  });
});

//developpement
gulp.task('dev', function () {
  nodemon({
    script: './src/index.js',
    ext: 'js',
    tasks: ['lint'],
    env: {
      NODE_ENV: 'development'
    }
  });
});

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
})

gulp.task('ci:lint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-coverage', function () {
  return gulp.src(['src/**/*.js', '!src/config/environment/*'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], function () {
  process.env.NODE_ENV = 'test';

  gulp.src(['test/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      dir: './target/coverage',
      reporters: ['html']
    }))
    .once('end', function () {
      process.exit();
    });

});

gulp.task('ci:coverage', ['pre-coverage'], function () {
  process.env.NODE_ENV = 'test';

  gulp.src(['test/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      dir: './target',
      reporters: ['cobertura']
    }));
});

gulp.task('mocha', function () {
  process.env.NODE_ENV = 'test';

  return gulp
    .src(['test/**/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec'
    })).on('error', handleError);

});

gulp.task('ci:test', function () {
  process.env.NODE_ENV = 'test';

  return gulp
    .src(['test/**/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'xunit',
      reporterOptions: {
        output: './target/test-reports.xml'
      }
    })).on('error', handleError);

});

//test live reload
gulp.task('test', ['mocha'], function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['mocha']);
});

function handleError(err) {
  this.emit('end');
}
