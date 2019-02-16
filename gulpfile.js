var gulp = require('gulp'),
	runSequence = require('run-sequence');
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'), // переводит SASS в CSS
    cssnano = require('gulp-cssnano'), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображений
    concat = require('gulp-concat'), // Объединение файлов - конкатенация
    uglify = require('gulp-uglify'), // Минимизация javascript
    rename = require('gulp-rename'), // Переименование файлов
    del = require('del');

/* --------------------------------------------------------
   ----------------- Таски ---------------------------
------------------------------------------------------------ */


// Копирование файлов HTML в папку dist

gulp.task('html', function() {
    return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

// Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task('sass', function() { // Создаем таск "sass"
  	return gulp.src(['app/sass/**/*.sass']) // Берем источник
    	.pipe(autoprefixer())
    	.pipe(sass())
  		.pipe(gulp.dest('dist/css'));
});


// Объединение и сжатие JS-файлов
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js') // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один 
        //.pipe(uglify()) // вызов плагина uglify - сжатие кода
        //.pipe(rename({ suffix: '.min' })) // вызов плагина rename - переименование файла с приставкой .min
        .pipe(gulp.dest('dist/js')); // директория продакшена, т.е. куда сложить готовый файл
});

// Сжимаем картинки
gulp.task('imgs', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

// Переносим шрифты
gulp.task('fonts', function() {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});


gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('build', gulp.series('clean', 'html', 'sass', 'scripts', 'imgs', 'fonts', function(done) {
  // do more stuff
  done();
}));

gulp.task('watch', function() {
    gulp.watch('app/*.html', gulp.series ('html'));
    gulp.watch('app/sass/*.sass', gulp.series ('sass'));
    gulp.watch('app/js/*.js', gulp.series ('scripts'));
    gulp.watch('app/img/*', gulp.series ('imgs'));
    gulp.watch('app/fonts/*', gulp.series ('fonts'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        files: ['dist/']
    });
});

gulp.task('default', gulp.parallel('build', 'watch', 'server', function(done) {
  // do more stuff
  done();
}));