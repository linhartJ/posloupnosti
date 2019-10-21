const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const fs = require('fs');
const tsProject = ts.createProject('tsconfig.json');

function cleanTask() {
    if (!fs.existsSync("./build")) fs.mkdirSync("./build");
    return gulp.src("build/*")
        .pipe(clean());
}

function typescriptTask() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('build'));
}

function copyIndex() {
    return gulp.src("src/main/index.html")
        .pipe(gulp.dest("build"));
}

exports.default = gulp.series(cleanTask, typescriptTask, copyIndex);