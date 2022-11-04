
const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require('path');
let filePath = path.resolve(__dirname,"./files")
let filePath2 = path.resolve(__dirname,"./files-copy")

fs.access(filePath2,err=>{
    if(err){
        createDir(filePath2)
        .then(data => copyDir(filePath,filePath2))
        console.log('Успешно создано');
    }else{
        deleteDir(filePath2)
        .then(data => copyDir(filePath,filePath2))
        console.log('Успешно обновнено');
    }
})
//Создание директории
async function createDir(dirPath){
    let done = await fsPromise.mkdir(dirPath,{recursive:true})
    return done
}

//Очистка директории
async function deleteDir(pathTo){
    let files = await fsPromise.readdir(pathTo,{withFileTypes: true})
         files.forEach(async file => {
             let pathFile = path.join(pathTo,file.name)
             if(file.isFile()){
                 try{
                    await fsPromise.unlink(pathFile)
                 }catch(err){console.log(err);}
             }
             if(file.isDirectory()){
                 let done = await deleteDir(pathFile)
                 if(done.length==0){
                     fsPromise.rmdir(pathFile)
                 }
             }  
         })
         return files
     }
 //Копирование папки Assets
 function copyDir(dirPath,copyDirPath){
   fs.readdir(dirPath,{withFileTypes: true},(err,data)=>{
     if(err){throw err}
     data.forEach(async item=>{
     if(item.isFile()){
       let fromPath =  path.join(dirPath,item.name)
       let toPath = path.join(copyDirPath,item.name)
       try{
         await fsPromise.copyFile(fromPath,toPath)
       }catch(err){console.log(err);}
     }
     if(item.isDirectory()){
       let dirPath = path.join(filePath,item.name)
       let copydirPath = path.join(filePath2,item.name)
       createDir(copydirPath)
       .then( data => copyDir(dirPath,copydirPath))
     }
     })
   })
 }
