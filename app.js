var http = require("http");
var https = require("https");
var fs = require('fs');
var PORT = process.env.PORT || 8000;


var allow = [];
var maps =  [];
var types =  [];
function whitelist(map, type) {
	allow.push("/" + map);
	maps.push(map);
	types.push(type);
}

// Whitelist a bunch of reasources
whitelist("style.css", "style/css");
whitelist("script.js", "text/javascript");
whitelist("favicon.ico", "image/x-icon");
whitelist("manifest.json", "json");

http.createServer((request, response) => {
	var path = request.url;
	console.log(path);
	
	if (path.slice(0, 5) === "/app/") { // Check if it's the app
		if (path.length === 5) {
			fs.readFile(path + "index.html", function(error, content) {
				response.writeHead(200, { "Content-Type": "text/html" });
				response.end(content); //, "utf-8");
			});
		} else {
			fs.readFile(path, function(error, content) {
				response.writeHead(200, { "Content-Type": "text/html" });
				response.end(content); //, "utf-8");
			});
		}
	} else if (allow.includes(path)) {
		var allowIndex = allow.indexOf(path);
		fs.readFile(maps[allowIndex], function(error, content) {
			response.writeHead(200, { "Content-Type": types[allowIndex] });
			response.end(content); //, "utf-8");
		});
	} else if (path === "/posts") {
		if (process.env.IG_TOKEN === undefined) {
			response.writeHead(500, { "Content-Type": "text/html" });
			response.end(":)");
			return;
		}
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
						https.get("https://graph.instagram.com/" + postsList[i].id + "?fields=caption,timestamp,media_url,media_type&access_token=" + process.env.IG_TOKEN, r => {
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
					response.end(JSON.stringify(posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))));
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
