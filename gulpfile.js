// import { src, dest, series } from 'gulp';
import gulp from 'gulp';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import nodemon from 'nodemon';
const sassCompiler = gulpSass(sass);

function loadEnv(envFile) {
    if (fs.existsSync(envFile)) {
        dotenv.config({ path: envFile });
        console.log(`Loaded environment variables from ${envFile}`);
    } else {
        console.error(`Environment file ${envFile} not found`);
    }
}

export function compileSass() {
  return gulp
    .src('src/app/scss/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile SCSS to CSS
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify the CSS
    .pipe(gulp.dest('src/app/css'));
}

export function watchSass() {
  gulp.watch('src/app/scss/**/*.scss', compileSass); // Watch for changes in SCSS files
}

function devServer(cb) {
  console.log('Starting dev server');
  loadEnv('.env.dev');
  nodemon({
    script: 'src/server/server.js',
    watch: ['src/server/*'],
    env: { 'NODE_ENV': 'development' }
  }).on('start', () => {
    console.log('Nodemon started');
    cb();
  }).on('restart', (files) => {
    console.log('Nodemon restarted due to changes in: ', files);
  }).on('quit', () => {
    console.log('Nodemon quit');
    cb();
  });
}
function build(cb) {
    loadEnv('.env.prod');
    exec('next build', (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
}

function prodServer(cb) {
    loadEnv('.env.prod');
    exec('next start', { env: process.env }, (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
}

export const runDev = gulp.series(
  compileSass,
  gulp.parallel(watchSass, devServer)
);

export const runProd = gulp.series(
  compileSass,
  build, 
  prodServer
);

export const runBuild = gulp.series(
  compileSass,
  build
);