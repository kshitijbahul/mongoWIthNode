'use strict;'
const gulp  = require("gulp");
const del = require("del");
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const path = require("path");
const nodemon = require("nodemon");
const gulpSequence = require('gulp-sequence')

gulp.task('clean',()=>{
    del(['./build'],{force:true})
});


gulp.task('moveMigrations',['clean'],()=> {
    return gulp
      .src('src/**/*.sql')
      .pipe(gulp.dest('build/'));
});

gulp.task('buildBackend',()=> {
    return gulp
      .src('src/**/*.ts')
      .pipe(typescript(tscConfig.compilerOptions))
      .on('error', function(){process.exit(1);})
      .pipe(gulp.dest('build/'));
});

gulp.task('runExpress',['buildBackend'],(cb)=>{
    const options={
        watch: ['./build/','./src'],
        script: './build/app.js',
        
    }
    return nodemon(options).once('start',cb);
});

gulp.task('local',gulpSequence('runExpress'));
gulp.task('default',['runExpress']);
gulp.task('build',['buildBackend']);
gulp.task('runserver',['runExpress']);
//gulp.task('default',gulp.series('buildBackend','runExpress'));