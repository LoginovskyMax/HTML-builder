const path = require("path") 
let filePath = path.resolve(__dirname,"text.txt")
const fs = require("fs")
//через поток
let readFile = new fs.ReadStream(filePath,{encoding: 'utf-8'})
readFile.on('readable',function(){
    let data = readFile.read()
    if(data!=null){console.log(data);}
})
//через чтение
// fs.readFile(filePath,"utf-8",(err,data)=>{
//     if(err){throw err}
//     console.log(data);
// })