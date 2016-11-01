
// var gulp = require("gulp");
// var babel = require("gulp-babel");

// gulp.task("default", function () {
//   return gulp.src("js/*.js")// ES6 源码存放的路径
//     .pipe(babel()) 
//     .pipe(gulp.dest("dist")); //转换成 ES5 存放的路径
// });

// gulp.task('watch', ['default'], function() {
//   gulp.watch(['js/*.js'], ['default']);
// });
// 

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify');


// Load plugins
var $ = require('gulp-load-plugins')();

/* es6 */
gulp.task('es6', function() {
  
  return gulp.src('js/*.js')
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('watch', ['es6'], function() {
  gulp.watch(['js/*.js'], ['es6']);
});