
var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    Cache = require('gulp-file-cache'),
    swaggerGenerator = require('gulp-apidoc-swagger'),
    shell = require('gulp-shell'),
    apidoc = require('gulp-api-doc');
// var cache = new Cache();

gulp.task("watch", function (cb) {
    var stream = nodemon({
        script: "src/app.js",
        ignore: [
            'gulpfile.js',
            'node_modules/**'
        ],
        watch: "src"
    });
    return stream;
});

gulp.task('apidoc', () => {
    return gulp.src(['src/controllers/*.js'])
        .pipe(apidoc({ markdown: true }))
        .pipe(gulp.dest('static/docs'));
});

gulp.task('swaggerGenerator', ['apidoc'], () => {
    swaggerGenerator.exec({
        src: "src/controllers/",
        dest: "static/docs/"
    });
});

gulp.task('md', ['swaggerGenerator'], () => {
    shell.task('npx apidoc-markdown2 -p ./static/docs -o ./api.md')
})

gulp.task('doc', ['apidoc', 'swaggerGenerator', 'md']);