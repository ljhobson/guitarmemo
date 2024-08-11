var http = require("http");
var PORT = 8000;


http.createServer((req, res) => {
	console.log("Server running on port " + PORT);

	res.write("Hello Guitar");
	res.end();
}).listen(PORT);