
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    //clean=require('gulp-clean'),//清理
  rename = require("gulp-rename"),
    less = require('gulp-less');

gulp.task('webserver', function() {
    connect.server({root: '../app',port: 8888});
});


gulp.task('html', function () {
    gulp.src(['./src/**/*.html','./src/**/*.htm'])
        .pipe(gulp.dest('../app'));
});

gulp.task('js', function () {
    gulp.src('src/**/*.js')
        .pipe(gulp.dest('../app'));
});

gulp.task('less', function () {
    gulp.src('src/**/*.less').pipe(less()).pipe(rename({
      //  dirname: "/demo",

        extname: ".css"
    }))
        .pipe(gulp.dest('./../app/css'));
});
//
////清理文件
//gulp.task('clean', function() {
//    gulp.src(['../app'], {read: false})
//        .pipe(clean());
//});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.html','./src/**/*.htm'], ['html']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch(['src/**/*.less'], ['less']);

});


gulp.task('default', ['webserver','watch','html','js','less']);


