const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const fs = require('fs');
var uglify = require('gulp-uglify');
const tsProject = ts.createProject('tsconfig.json');

function cleanTask() {
    if (!fs.existsSync("./build")) fs.mkdirSync("./build");
    return gulp.src("build")
        .pipe(clean());
}

function cleanTemp() {
    return gulp.src("build/temp")
        .pipe(clean())
}

async function initDirs() {
    fs.mkdirSync("./build");
    fs.mkdirSync("./build/temp");
    fs.mkdirSync("./build/p1");
    fs.mkdirSync("./build/p2");
    fs.mkdirSync("./build/p3");
    await Promise.resolve();
}

function typescriptTask() {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('build/temp'));
}

function joinJS(){
    gulp.src(["build/temp/functions.js", "build/temp/data.js", "build/temp/p1.js"])
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/p1"));
    gulp.src(["build/temp/functions.js", "build/temp/data.js", "build/temp/p2.js"])
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/p2"));
    return gulp.src(["build/temp/functions.js", "build/temp/data.js", "build/temp/p3.js"])
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/p3"));
}

function copyIndex() {
    return gulp.src("src/main/index.html")
        .pipe(gulp.dest("build/p1"))
        .pipe(gulp.dest("build/p2"))
        .pipe(gulp.dest("build/p3"));
}

function copyStylesheet() {
    return gulp.src("src/main/w3.css")
        .pipe(gulp.dest("build/p1"))
        .pipe(gulp.dest("build/p2"))
        .pipe(gulp.dest("build/p3"));
}

function copyResources() {
    return gulp.src("src/resources/*")
        .pipe(gulp.dest("build/p1"))
        .pipe(gulp.dest("build/p2"))
        .pipe(gulp.dest("build/p3"));
}

exports.default = gulp.series(cleanTask, initDirs, typescriptTask, joinJS, copyIndex, copyStylesheet, copyResources, cleanTemp);