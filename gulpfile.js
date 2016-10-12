// gulp is a package manager that optimizes code and serves it to the browser
var gulp = require('gulp');
// browserify compiles code so the browser can understand it
var browserify = require('browserify');
// vinyl-source-stream puts browserify source code into a new file
var source = require('vinyl-source-stream');
// concat consolidates all js files into one
var concat = require('gulp-concat');
// uglify minifies scripts, e.g. removes all unncessary characters while preserving its functionality
var uglify = require('gulp-uglify');
// gulp-util allows us to build production or dev environments (using $gulp build or $gulp build --production)
var utilities = require('gulp-util');
// buildProduction is a sister to gulp-util that lets us build a prod environment
var buildProduction = utilities.env.production;
// with every build, we wipe the slate clean to make sure we're using the latest files by cleaning up with del.
var del = require('del');
// a linter that analyzes code and warns us about stuff that doesn't follow code conventions
var jshint = require('gulp-jshint');
// bootstrap css and js and something else
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
// implement our development server with live reloading
var browserSync = require('browser-sync').create();
// css preprocessor
var sass = require('gulp-sass');
// adds some code which allows us to see which Sass files are responsible for each CSS rule that we see in the browser.
var sourcemaps = require('gulp-sourcemaps');


gulp.task('myTask', function(){
  console.log('hello gulp');
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});

gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

// serves the app to the server/browser. $gulp serve will run a js build, a bower build and browserify.
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});
// end tasks related to serve

gulp.task('cssBuild', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});
