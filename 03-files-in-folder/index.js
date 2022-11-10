const fs = require("fs");
const path = require('path');
let filePath = path.resolve(__dirname,"./secret-folder")
//чтение папки и вывод информации о ней
fs.readdir(filePath,{withFileTypes: true},(err,data)=>{
  if(err){throw err}
    data.forEach(item=>{
      if(item.isFile()){
        let name = item.name.split('.')[0]
        let ext = path.extname(item.name)
        let index =  path.resolve(__dirname,`./secret-folder/${item.name}`)
        fs.stat(index,(err,stats)=>{
          console.log('Имя файла: ' + name + '; Расширение : '+ ext + '; Размер : ' + stats.size +' байт;');
        })
      }
    })
})