
const fs = require("fs");
const path = require('path');
let filePath = path.resolve(__dirname,"./secret-folder")

fs.readdir(filePath,{withFileTypes: true},(err,data)=>{
    if(err){throw err}
    data.forEach(item=>{
        if(item.isFile()){
         let name = item.name.split('.')[0]
         let extension = item.name.split('.')[1]
         let index =  path.resolve(__dirname,`./secret-folder/${item.name}`)
         fs.stat(index,(err,stats)=>{
            console.log('Имя файла: ' + name + '; Расширение : '+ extension + '; Размер : ' + stats.size +' байт;');
         })
        }
    })
})