var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

//1. Gulp-sass **************CHECKED*****
gulp.task('sass', function(){
    return gulp.src('app/scss/styles.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/pre-autoprefixer'))
});


//2. Gulp Auto-prefix*******CHECKED********
var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
gulp.task('autoprefixer', function () {
    return gulp.src ('app/pre-autoprefixer/*.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css')); //app/css2  dist
});


//3. Minify CSS files (gulp-csso)****CHECKED****
var csso = require('gulp-csso');

gulp.task('csso', function () {
    return gulp.src('app/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('app/css/min'));
});


//4. Minify HTML files (gulp-htmlmin)**********CHECKED********
var htmlmin = require('gulp-html-minifier');

gulp.task('minify', function() {
    gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('app/html_min'))
});


//5. Minify image files (gulp-imagemin)******CHECKED*****

//const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('mimage', () => {
    return gulp.src('app/src images/*.jpg')
        .pipe (imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/imagemin'));
});

//6. Minify JS files (gulp-uglify)*******CHECKED************

var uglify = require('gulp-uglify');

gulp.task('compress', function(){
   return gulp.src('app/pre-js/*.js') //from
       .pipe(uglify())
       .pipe(gulp.dest('app/js')) //destination
});


//7. Concatenated CSS and JS files (gulp-useref)

var gulp = require ('gulp'),
    useref = require('gulp-useref');

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('app/useref'));
});

//set up a gulp watch function that will automatically run
// each process only when needed and whenever changed.
//GULP WATCH
gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/pre-autoprefixer/*.css', ['autoprefixer']);
    gulp.watch('app/css/*.css', ['csso']);
    gulp.watch('app/*.html', ['minify']);
    gulp.watch('app/src images/*.jpg', ['mimage']);
    gulp.watch('app/pre-js/*.js', ['compress']);
    gulp.watch('app/*.html', ['useref']);
});


