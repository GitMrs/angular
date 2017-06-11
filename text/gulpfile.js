var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");//压缩html
var cssmin = require("gulp-minify-css");//压缩css
var concat = require("gulp-concat");
var webserver = require("gulp-webserver");
var url = require("url");
var date = require("./data/date.js");
var rev = require('gulp-rev');                      //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');   //- 路径替换
gulp.task("htmls",()=>{
	gulp.src("./src/html/*.html")
		.pipe(htmlmin({collapseWhitespace: true}))
		// .pipe(rev())
		.pipe(gulp.dest("./bound/html"))
        // .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        // .pipe(gulp.dest('./rev/html')); //将re-manifest.json存放到的路径
})
gulp.task("css",()=>{
	gulp.src("./src/css/*.css")
		.pipe(cssmin())
		.pipe(rev())
		.pipe(gulp.dest("./bound/css"))
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev/css/')) //将re-manifest.json存放到的路径
        
})
gulp.task('replaceRev', ["css","htmls"], function() {
    setTimeout(function() {
        gulp.src(['./rev/**/*.json',"./bound/html/*.html"]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
            .pipe(revCollector({
                replaceReved: true,
                dirReplacements: {
                    'css': '../css/'
                    // 'cdn/': function(manifest_value) {
                    //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                    // }
                }
            })) //- 执行文件内css名的替换
            .pipe(gulp.dest('./bound/html')); //- 替换后的文件输出的目录
    }, 300)
})
gulp.task("server",["replaceRev"],()=>{
	gulp.watch("./src/html/*.html",["htmls"])
	gulp.watch("./src/css/*.css",["replaceRev"])
	console.log(url.parse)
	gulp.src('./bound')
		.pipe(webserver({
			livereload: true,
			port:5050,
			directoryListing: true,
			// middleware:function(req,res,next){
			// 	var pathName = url.parse(req.url).pathname
			// 	date.forEach((i)=>{
			// 		switch(pathName){
			// 		case  i.api:{
			// 			i.headle(req,res,next,url)
			// 		}
			// 		break;
			// 	}
			// 	})
				
				
			// },
			// open:true
			open:"./html/demo.html"
		}))
})

