let gulp = require('gulp'),
    scss = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    gulpIf = require("gulp-if"),
    yargs = require("yargs"),
    gcmq = require('gulp-group-css-media-queries');


let argv = yargs.argv,
    production = !!argv.production;

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('scss', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(gulpIf(!production, sourcemaps.init()))
        .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(gulpIf(production, autoprefixer('last 10 versions')))
        .pipe(gulpIf(!production, sourcemaps.write()))
        .pipe(gcmq())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('video', function () {
    return gulp.src('app/video/*')
        .pipe(gulp.dest('dist/video'));
});

gulp.task('clean', async function () {
    del.sync('dist');
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
    gulp.watch('app/img/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.series("clean",
    gulp.parallel(['html', "js", "video", 'img', 'scss']),
    gulp.parallel(['browser-sync', 'watch'])));

gulp.task('prod', gulp.series('clean',
    gulp.parallel(['html', "js", "video", 'img', 'scss'])));


