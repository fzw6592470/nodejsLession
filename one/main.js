
//setTimeout(function(){
//    console.log(__filename);
//},1000);

//process.stdout.write("Hello,world!\n");
//
//process.argv.forEach(function(val,index,array){
//    switch(val){
//        case 'node':
//            console.log("%d:This is node process",index);
//            break;
//        case 'MartinCui':
//            console.log(index + ": Hello,MartinCui!");
//            break;
//        default:
//            console.log(index+":"+val);
//    }
//    
//    
//});
//
//console.log(process.execPath);
//
//console.log(process.platform);
//
//var CWD = process.cwd();
//
//process.chdir("../");
//var cwd = process.cwd();
//console.log("当前目录："+CWD);
//console.log("当前目录："+cwd);


var util = require("util");

function Person() {
    this.name = "Martin";
    this.toString = function(){
        return this.name;
    }
}

var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj,true,2,true));

