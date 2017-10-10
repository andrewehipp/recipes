const gulp =  require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');


const project = require('./package.json').project;
const webpackConfig = require('./webpack.config.js');


// Bundler function
function bundle() {
    return gulp
        .src(`${project.src.js}/main.js`)
        .pipe(
            webpackStream(webpackConfig, webpack)
                .on('error', (err) => {
                    console.log('WEBPACK ERROR', err);
                })
        )
        .pipe(gulp.dest('./dist'));
}

gulp.task('bundle', bundle);


function watch() {
    gulp.watch(`${project.src.scss}/**/*.scss`, bundle);
    gulp.watch([
        `${project.src.js}/**/*.js`,
        `${project.src.js}/**/*.jsx`,
    ],
    bundle);

    // bundler.on('update', scripts);

    // gulp.watch('**/*.html', () =>
    //     gulp.src('*.html')
    //         .pipe(browserSync.reload({
    //             stream: true,
    //         }))
    // );

    // Stop old gulp watch when gulpfile is modified.
    // https://gist.github.com/pornel/ca9631f5348383b61bc7b359e96ced38
    gulp.watch('gulpfile.js', () => {
        process.exit(0);
    });
}

gulp.task('watch', watch);


gulp.task('default', bundle);
