var http = require("http");
var https = require("https");
var fs = require('fs');
var PORT = process.env.PORT || 8000;

http.createServer((request, response) => {
	var path = request.url;
	console.log(path);
	
	if (path === "/style.css") {
		fs.readFile("style.css", function(error, content) {
			response.writeHead(200, { "Content-Type": "style/css" });
			response.end(content); //, "utf-8");
		});
	} else if (path === "/script.js") {
		fs.readFile("script.js", function(error, content) {
			response.writeHead(200, { "Content-Type": "style/css" });
			response.end(content); //, "utf-8");
		});
	} else if (path === "/favicon.ico") {
		fs.readFile("favicon.ico", function(error, content) {
			response.writeHead(200, { "Content-Type": "image/x-icon" });
			response.end(content); //, "utf-8");
		});
	} else if (path === "/posts") {
		https.get("https://graph.instagram.com/me?fields=id,username,media&access_token=" + process.env.IG_TOKEN, res => {
			console.log('Status Code:', res.statusCode);
			var body = "";
			res.on("data", function(chunk) {
				body += chunk;
			});
			
			res.on("end", function() {
				var jsondata = JSON.parse(body);
				var postsList = jsondata.media.data;
				var posts = [];
				var promises = [];
				for (var i = 0; i < postsList.length; i++) {
					 promises.push(new Promise(resolve => {
						https.get("https://graph.instagram.com/" + postsList[i].id + "?fields=caption,media_url&access_token=" + process.env.IG_TOKEN, r => {
							var data = "";
							r.on("data", function(chunk) {
								data += chunk;
							});
							r.on("end", function() {
								posts.push(JSON.parse(data));
								resolve(true);
							});
						});
					}));
				}
				Promise.all(promises).then(() => {
					response.writeHead(200, { "Content-Type": "text/json" });
					response.end(JSON.stringify(posts));
				});
			});
		});
	} else {
		fs.readFile("index.html", function(error, content) {
			response.writeHead(200, { "Content-Type": "text/html" });
			response.end(content);
		});
	}
}).listen(PORT);

console.log("Server running on port " + PORT);
