const { src, dest, watch, series, parallel } = require("gulp");
const gulpif = require("gulp-if");
const argv = require("yargs").argv;
const browsersync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rollup = require("gulp-rollup");

const path = {
  src: {
    html: "./src/**/*.html",
    css: "./src/styles/**/*.sass",
    img: "./src/img/**/*.{jpg,png,svg,ico,webp,avif,gif}",
    fonts: "./src/fonts/**/*.{woff2,woff}",
    js: "./src/js/**/*.js",
  },
  build: {
    html: "./build/",
    css: "./build/css",
    img: "./build/img",
    fonts: "./build/fonts",
    js: "./build/js",
  },
  watch: {
    html: "./src/**/*.html",
    css: "./src/styles/**/*.sass",
    img: "./src/img/**/*.{jpg,png,svg,ico,webp,avif,gif}",
    js: "./src/js/**/*.js",
  },
};

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: "./build",
    },
    port: 3000,
    notify: false,
  });
};

const html = () => {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
};

const fonts = () => {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
};

const images = () => {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
};

const styles = () => {
  return src("./src/styles/**/styles.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulpif(argv.prod, cleanCss({ level: 2 })))
    .pipe(dest(path.build.css))

    .pipe(src("./src/styles/normalize.min.css"))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
};

const scripts = () => {
  return src(path.src.js)
    .pipe(
      rollup({
        input: "./src/js/script.js",
        format: "cjs",
      })
    )
    .pipe(gulpif(argv.prod, babel({ presets: ["@babel/env"] })))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
};

const clean = () => {
  return del("./build", { force: true });
};

const watchFiles = () => {
  watch([path.watch.html], html);
  watch([path.watch.css], styles);
  watch([path.watch.img], images);
  watch([path.watch.js], scripts);
};

const build = series(clean, parallel(html, fonts, images, styles, scripts));
const watcher = parallel(build, watchFiles, browserSync);

exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.watch = watcher;
exports.default = build;
