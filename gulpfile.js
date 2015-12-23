var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    // integration / end-to-end test
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('default', function(){ // run 'gulp'
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

gulp.task('test', function(){
    // for process.env.ENV
    env({vars: {ENV:'Test'}});

    gulp.src('Tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});
