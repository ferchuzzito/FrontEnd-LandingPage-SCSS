const gulp = require("gulp");
const { src, watch, parallel } = require("gulp");

const paths = {
  sassFiles: "./scss/**/*.scss",
  cssDest: "./css",
};

const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const purgecss = require("gulp-purgecss");

function css(done) {
  // sass directory
  src(paths.sassFiles)
    // sourcemaps
    .pipe(sourcemaps.init())
    .pipe(plumber())
    // outputstyle (nested, compact, expanded, compressed)
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    // autoprefixer
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ["> .5%, last 10 versions"],
        }),
      ])
    )
    .pipe(sourcemaps.write("./"))
    // css output directory
    .pipe(gulp.dest(paths.cssDest));
  done();
}

function Cleancss(done) {
  src("css/*.css")
    .pipe(
      purgecss({
        content: ["./*.html"],
        rejected: true,
      })
    )
    .pipe(gulp.dest("css/clean"));
  done();
}

function dev(done) {
  watch(paths.sassFiles, css);
  done();
}
exports.css = css;
exports.cleanCSS = Cleancss;

exports.dev = parallel(dev);