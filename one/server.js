var http = require("http"),
    url = require("url");

function start(route) {
    function onRequest(req,res) {
        var pathname = url.parse(req.url).pathname;
        console.log("request for:"+pathname+"received.\n");

        route(pathname);

        res.writeHead(200,{ "Conent-Type" : "text/html" });

        res.write("Hello world!");

        res.end();
    }

    http.createServer(onRequest).listen(8088);
    console.log("server has started.\n");
}

exports.start = start;
