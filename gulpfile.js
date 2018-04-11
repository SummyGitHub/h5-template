const gulp = require('gulp')
const del = require('del') // 删除文件和文件夹
const browserSync = require('browser-sync').create() // 浏览器同步刷新
const sass = require('gulp-sass') // 编译sass
const htmlmin = require('gulp-htmlmin') // 压缩html
const cleanCss = require('gulp-clean-css') // 压缩css
const autoprefixer = require('gulp-autoprefixer') // 自动填写厂商前缀 -webkit-等
const uglify = require('gulp-uglify') // 压缩js
const imagemin = require('gulp-imagemin')  // 压缩图片
const base64 = require('gulp-html-css-js-base64')  // 将图片转换成base64
const runSequence = require('gulp-sequence')  // 用于gulp顺序执行
const reload = browserSync.reload

//生产环境下
gulp.task('default', ['server','watch'])

//production环境   
gulp.task('bulid',function(cb){
  runSequence('clean',['sass','js','html', 'assets'], cb)
})

//创建一个服务器，用于试试刷新
gulp.task('server',['sass','js','html','assets'], function(){
  browserSync.init({
    server: './bulid'
  })
})

//发布时清除原本的bulid目录
gulp.task('clean', function(cb){
  return del(['bulid','!bulid/.git'], cb)
})

//编译sass并将css进行压缩
gulp.task('sass', function(){
  return gulp.src('src/style/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 1 version']}))
    .pipe(cleanCss({
      compatibility: 'ie8',
      format: 'keep-breaks'
    }
    ))
    .pipe(gulp.dest('bulid/style'))
    .pipe(reload({stream: true}))
})

//压缩js
gulp.task('js', function(){
  return gulp.src('src/js/**.js')
    // .pipe(uglify())
    .pipe(gulp.dest('bulid/js'))
    .pipe(reload({stream: true}))
})

//压缩html,将文字中的一些尺寸小的图片转化成base64
gulp.task('html', function(){
  const options = {
    collapseWhitespace: true,  // 压缩HTML
    minifyJS: true,  // 压缩页面JS
    miniCSS: true,  // 压缩页面CSS
  }
  return gulp.src('src/**.html')
    // .pipe(base64({
    //   baseDir: 'src',
    //   maxImageSize: 4*1024
    // }))
    .pipe(htmlmin(options))
    .pipe(gulp.dest('bulid'))
    .pipe(reload({stream: true}))
})

//压缩静态资源
gulp.task('assets', function(){
  return gulp.src('src/assets/**.*')
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('bulid/assets'))
    .pipe(reload({stream: true}))
})

gulp.task('watch', function(){
  gulp.watch('src/style/**.scss', ['sass'])
  gulp.watch('src/js/**.js', ['js'])
  gulp.watch('src/**.html', ['html'])
  gulp.watch('src/assets', ['assets'])
})

