
const {src,dest,watch,series}= require('gulp');

//CSS y SASS
const sass=require('gulp-sass')(require('sass'));
const postcss=require('gulp-postcss');
const autoprefixer = require('autoprefixer');
//Imagenes
const imagemin=require('gulp-imagemin');
const webp =require('gulp-webp');
const avif=require('gulp-avif');
const sourcemaps=require('gulp-sourcemaps');
const cssnano=require('cssnano');

function css(done){
  //compilar sass
  //pasos:1 - Identid¡ficar archivo, 2-Compilar 3-Guardar el .css
src('src/scss/app.scss')
.pipe(sourcemaps.init())
  .pipe(sass({outputStyle:'expanded'}))
  .pipe(postcss([autoprefixer(),cssnano()]))
  .pipe(sourcemaps.write('.'))
  .pipe( dest('build/css'))

done();
}
function imagenes(){
  return src('src/img/**/*')
  .pipe( imagemin({ optimizationLevel:  3 }))
  .pipe(dest('build/img'))
 
}
function versionWebp(){
  const opciones={
    quality:50
  }
  return src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
}
function versionAvif(){

  const opciones={
    quality:50
  }
  return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
}
function dev(){
  watch('src/scss/**/*.scss',css);
   watch('src/scss/**/*',imagenes);
}
exports.css=css;
exports.dev=dev;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.default=series(imagenes,versionWebp,versionAvif,css,dev);

//series - Se inicia una tarea y hasta que finaliza, inicia la suguiente.
//parallel - Inicia todas al mismo tiempo