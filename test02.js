var fs = require('fs');
var a = fs.fopen('input.txt');
var result = fs.createReadStream(a);
console.log(result);
