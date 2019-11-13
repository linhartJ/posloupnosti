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

function joinJS() {
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

function encryptIndexForTaskGroup(pf) {
    const allContent = fs.readFileSync("build/" + pf + "/index.js", "utf-8");
    const allMatches = allContent.match(/new Task\("(.*?)","(.*?)"\)/g)
        .reduce(function (acc, m) {
            var m2 = m.match(/new Task\("(.*?)","(.*?)"\)/);
            acc.push(m2[1]);
            acc.push(m2[2]);
            return acc
        }, []);
    allMatches.push(allContent.match(/p\dFm="(.*?)"/)[1]);
    const map = {};
    allMatches.forEach(s => s.split("").forEach(c => map[c] = 0));
    const array = [];
    for (var c in map) array.push(c);
    shuffle(array);
    let result = allContent;
    allMatches.forEach(m => {
        result = result.replace(`"${m}"`, encrypt(m, array))
    });
    result = result.replace("var c=[]", `var c=[${array.map(c => '"' + c + '"').join(",")}]`);
    fs.writeFileSync("build/" + pf + "/index.js", result);
}

function encryptSensitiveStuff() {
    encryptIndexForTaskGroup("p1");
    encryptIndexForTaskGroup("p2");
    encryptIndexForTaskGroup("p3");
    return Promise.resolve()
}

function encrypt(s, a) {
    const idxs = s.split("").map(c => a.indexOf(c)).join(", ");
    return `df([${idxs}])`;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

exports.default = gulp.series(cleanTask, initDirs, typescriptTask, joinJS, encryptSensitiveStuff, copyIndex, copyStylesheet, copyResources, cleanTemp);