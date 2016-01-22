var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    watch       = require('gulp-watch'),
    reload       = browserSync.reload;

// Our development server that serves all the assets and reloads the browser
// when any of them change (hence the watch calls in it)
gulp.task(
    'server', function () {
        browserSync.init(
            {
                // change 'playground' to whatever your local Nginx/Apache vhost is set
                // most commonly 'http://localhost/' or 'http://127.0.0.1/'
                // See http://www.browsersync.io/docs/options/ for more information
                proxy: 'http://tenzing-web-2016.dev/'
            }
        );

        // Reload the browser if any .php file changes within this directory
        watch('./**/*.php', reload);

        watch('./**/*.html', reload);

        // Recompile sass into CSS whenever we update any of the source files
        watch(
            './src/scss/**/*.scss', function () {
                gulp.start('styles');
            }
        );

        // Watch our JavaScript files and report any errors. May ruin your day.
        watch(
            [
                './src/js/**/*.js'
            ], function () {
                //gulp.start('jshint');
                gulp.start('scripts');
            }
        );

        watch(
            './src/img/**', function () {
                gulp.start('images');
            }
        );

    }
);
