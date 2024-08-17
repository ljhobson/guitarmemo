var http = require("http");
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
	} else if (path === "/favicon.ico") {
		fs.readFile("favicon.ico", function(error, content) {
			response.writeHead(200, { "Content-Type": "image/x-icon" });
			response.end(content); //, "utf-8");
		});
	} else {
		fs.readFile("index.html", function(error, content) {
			response.writeHead(200, { "Content-Type": "text/html" });
			response.end(content); //, "utf-8");
		});
	}
}).listen(PORT);

console.log("Server running on port " + PORT);