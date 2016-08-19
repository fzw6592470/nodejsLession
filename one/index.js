var server = require("./server"),
    router = require("./router");

server.start(router.route);

console.log(__filename+'\n');
console.log(__dirname+'\n');
