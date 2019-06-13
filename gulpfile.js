'use strict';

var { src, dest, watch, series } = require('gulp');

var sass = require('gulp-sass');
var ts = require('gulp-typescript');

sass.compiler = require('node-sass');

var compileCss = function () {
  return src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./public/css'));
};

var compileJs = function () {
  
  return src('./src/ts/main.ts')
    .pipe(ts({
      outFile: 'app.js'
    }))
    .pipe(dest('./public/js'));
};

exports.default = series([compileJs, compileCss]);

// Watch for changes
var watchSource = function (done) {
	watch(["./src/**/*"], series(exports.default));
	done();
};


exports.watch = series(
  exports.default,
  watchSource
);