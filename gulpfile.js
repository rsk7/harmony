var gulp = require("gulp");
var browserify = require("gulp-browserify");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var livereload = require("gulp-livereload");
var ghPages = require("gulp-gh-pages");
var clean = require("gulp-clean");
var flatten = require("gulp-flatten");

var paths = {
  scripts: ["src/js/**/*.js", "src/js/**/*.jsx"],
  sass: ["src/sass/**/*.scss"],
  static: ["src/index.html"]
};

gulp.task("browserify", function() {
	return gulp.src("src/js/app.jsx")
		.pipe(browserify({
			transform: ["reactify", "debowerify"],
			extensions: [".jsx"]
		}))
		.pipe(rename("app.js"))
		.pipe(gulp.dest("www/js"))
		.pipe(livereload());
});

gulp.task("sass", function() {
	return gulp.src("src/sass/**/*.scss")
		.pipe(sass({
			outputStyle: "compressed",
			sourceComments: "map",
			includePaths: "./sass"
		}))
		.pipe(gulp.dest("www/css"))
		.pipe(livereload());
});

gulp.task("static-copy", function() {
	return gulp.src("src/index.html")
		.pipe(gulp.dest("www"))
		.pipe(livereload());
});

gulp.task("bower-copy", function() {
	return gulp.src("bower_components/**/*")
		.pipe(gulp.dest("www/bower_components"))
		.pipe(livereload());
});

gulp.task("watch", function() {
	livereload.listen();
	gulp.watch(paths.scripts, ["browserify"]);
	gulp.watch(paths.sass, ["sass"]);
	gulp.watch(paths.static, ["static-copy"]);
});

gulp.task("ghPages", function() {
    return gulp.src("www/**/*")
    	.pipe(ghPages());
});

gulp.task("clean", function() {
	return gulp.src("www", {read: false})
		.pipe(clean());
});

gulp.task("default", ["browserify", "sass", "static-copy", "bower-copy"]);
