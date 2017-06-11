var Mock = require("mockjs")

module.exports = [
	{
		"api":"/api",
		"headle":function(req,res,next,url){
			var data = Mock.mock({
				"list|6":[
					{
						"name":"11"
					}
				]
			})
			// var data = [
			// 	{
			// 		"class":"1504"
			// 	}
			// ]
			res.writeHead(200,{
				"Content-type":"application;charset=utf-8",
				"Access-Control-Allow-Origin":"*"
			});
			res.write(JSON.stringify(data));
			res.end()

		}
	},
	{
		"api":"/data",
		"headle":function(req,res,next,url){
			var Random = Mock.Random
			Random.extend({
   				constellation: function(date) {
	        		var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
       	 				return this.pick(constellations)
   		 		}
			})
			var data = Mock.mock({
				"list|0-8":[
					{
						"lation":Random.constellation()
					}
				]
			})
			res.writeHead(200,{
				"Content-type":"application;charset=Unicode",
				"Access-Control-Allow-Origin":"*"
			});
			res.write(JSON.stringify(data));
			res.end()

		}
	}
]