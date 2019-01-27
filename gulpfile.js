const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const pump = require('pump');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const faMinify = require('gulp-fa-minify');
const del = require('del');

gulp.task('html', () => {
    return gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});


gulp.task('js', function (cb) {
    pump([
            gulp.src('js/*.js'),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
});

gulp.task('css', () => {
    return gulp.src('css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', () => {
    return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fa', () => {
    const usedIcons = {
        fal: [],
        far: [],
        fas: ['play-circle', 'sliders-h', 'code', 'bold', 'quote-left'],
        fab: ['wpforms', 'css3', 'facebook-square', 'twitter-square', 'instagram']
    };

    return gulp.src('lib/fa-all.js')
        .pipe(faMinify(usedIcons))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('fonts', () => {
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function(){
    return del(['dist/**']);
});

gulp.task('default', gulp.series('clean', 'css', 'js', 'html', 'img', 'fa', 'fonts'));
