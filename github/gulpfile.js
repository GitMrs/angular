const gulp=require('gulp');
const server=require('gulp-webserver');
const rev=require('gulp-rev');
const collector=require('gulp-rev-collector');
const url=require('url');
const browser=require('gulp-browserify');
const imagemin = require('gulp-imagemin');
//执行mock数据并启动服务
var Mock =require("mockjs");
gulp.task('web',function(){
	gulp.src('./')
		.pipe(server({
			port:3000,
			livereload:true,
			directoryListing: true,
		    middleware:function(req,res,next){
		      	var pathname = (url.parse(req.url).pathname)
		      	if(pathname=="/api/index"){
		      		var datas=Mock.mock({
						"string|1-10":"@"
					})
					res.writeHead(200,{
						"Content-type":"application/json;charset=UTF-8",
			      	 	"Access-Control-Allow-Origin":"*"
					})
					 res.write(JSON.stringify(datas))
			      	 res.end()
		      	}
		      },
			open:'./index.html'
		}))
})
//版本控制
gulp.task('ver',function(){
	gulp.src('./src/css/style.css')
		.pipe(rev())
		.pipe(gulp.dest('./build/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./build/json'))
})
gulp.task('coll',['ver'],function(){
	gulp.src(['./build/json/*.json','./index.html'])
		.pipe(collector({replaceReved:true}))
		.pipe(gulp.dest('./'))
})
//图片压缩
gulp.task('image', () =>
    gulp.src('./src/image/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./build/images'))
)
//模块打包
gulp.task('webpack',function(){
	gulp.src('./src/js/*.js')
		.pipe(browser({
			insertGlobals : true,
			debug : !gulp.env.production
		}))
		.pipe(gulp.dest('./build/js'))
})