let koa = require('koa');
let app = new koa();

app.use(function *(){
    this.body = 'Hello Martin Cui.';
}).listen(8080);
