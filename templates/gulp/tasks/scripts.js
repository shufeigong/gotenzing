var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js') //select all javascript files under js/ and any subdirectory
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js')) //the destination folder
        
});

