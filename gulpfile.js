var gulp = module.exports = require('gulp');

var webserver = require('gulp-webserver');
var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var apps = require('./package').apps;
var devMode = process.env.NODE_ENV !== 'production';
var sass = require('gulp-sass');

var dest = function (path, raw) {
  var dest = !!path ? __dirname + '/public/' + path : __dirname + '/public/';
  return raw === true ? dest : gulp.dest(dest);
};

// serve static

gulp.task('serve', function() {
  gulp.src('./')
  .pipe(webserver({
    livereload: {
    enable: true, // need this set to true to enable livereload
    filter: function(fileName) {
      if (fileName.match(/.map$/)) { // exclude all source maps from livereload
      return false;
      } else {
      return true;
      }
    }
    }
  }));
});

// compile bower libs
gulp.task('bower', function () {
  var compileJs = gulp.src(bowerFiles().filter(function (f) {
    return f.indexOf('.js') > -1;
  })).pipe(concat('vendor.js'));

  if (devMode) {
    compileJs.pipe(dest('js'));
  } else {
    compileJs.pipe(uglify()).pipe(dest('js'));
  }

  var compileCss = gulp.src(bowerFiles().filter(function (f) {
      return f.indexOf('.css') > -1;
    }))
    .pipe(concatCss('vendor.css'));

  if (devMode) {
    compileCss.pipe(dest('css'));
  } else {
    compileCss.pipe(uglifyCss()).pipe(dest('/css'));
  }

  gulp
    .src(bowerFiles().filter(function (f) {
      return ['.eot', '.woff', '.svg', '.ttf'].filter(function (ext) {
        return f.indexOf(ext) > -1;
      }).length > 0;
    }))
    .pipe(dest('fonts'));
});

gulp.task('sass', function () {
  var buildStyle = function (style) {
    if (style == 'site') {
      return gulp.src(__dirname + '/app/sass/' + style + '.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass.sync({includePaths: [__dirname + '/app/sass/']}).on('error', sass.logError))
        .pipe(gulp.dest(__dirname + '/public/css/'));
    }
  };

  apps.forEach(function (app) {
    buildStyle(app);
  });
});

// watch sass
gulp.task('sass:watch', function () {
  gulp.watch(['./app/sass/**/*.*'], ['sass']);
});

// compile app
gulp.task('app', function () {
  var buildApp = function (app) {
    console.log(app);
    var g = gulp.src([
      'app/js/vendor/**/*.js',
      'app/js/app.js'
    ]);

    g.pipe(concat(app + '.js')).pipe(dest('js'));
  };

  apps.forEach(function (app) {
    buildApp(app);
  });
});

// compile assets
gulp.task('assets', function () {
  gulp.src(['app/assets/fonts/**/*.*']).pipe(dest('fonts'));
  gulp.src(['app/assets/img/**/*.*']).pipe(dest('img'));
  gulp.src(['app/assets/css/**/*.*']).pipe(dest('css'));
  gulp.src(['app/assets/data/**/*.*']).pipe(dest('data'));
});

// clean build
gulp.task('clean', function () {
  del([dest('js/*', true), dest('!js/.gitignore', true)]);
  del([dest('css/*', true), dest('!css/.gitignore', true)]);
  del([dest('fonts/*', true), dest('!fonts/.gitignore', true)]);
  del([dest('img/*', true), dest('!img/.gitignore', true)]);
});

// compile everything
gulp.task('compile', ['sass', 'app', 'assets', 'bower'], function () {});

// watch and build during development
gulp.task('watch', [ 'assets', 'app', 'sass' ], function () {
  gulp.watch(['./app/sass/**/*.*'], ['sass']);
  gulp.watch(['./app/js/**/*.*'], ['app']);
});
