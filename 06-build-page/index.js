const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require('path');
let filePathStyles = path.resolve(__dirname,"./styles")
let filePathHtml = path.resolve(__dirname,"./components")
let filePathDist = path.resolve(__dirname,"./project-dist")
let filePathAssets = path.join(__dirname,"./assets")
let copyAssets = path.join(filePathDist,'./assets')
//проверка наличия директории
fs.access(filePathDist,err=>{
  if(err){
    createDir(filePathDist)
    readDirCss()
    copyDir(filePathAssets,filePathDist)
    console.log('Успешно создано');
  }else{
    deleteDir(filePathDist)
    .then(data=>{readDirCss();copyDir(filePathAssets,filePathDist)})
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
      let dirPath = path.join(filePathAssets,item.name)
      let copydirPath = path.join(copyAssets,item.name)
      createDir(copydirPath)
      .then( data => copyDir(dirPath,copydirPath))
    }
    })
  })
}
//Чтение папки со стилями
async function readDirCss(){
 let data = await fsPromise.readdir(filePathStyles,{withFileTypes: true})
 .catch(err=>console.log('Что то пошло не так'))
 data.forEach(item=>{
   if(item.isFile()){
     let newPath = path.join(filePathStyles,item.name)
     if(path.extname(newPath) === ".css"){
       readCss(newPath)}
   }   
 }) 
}
//Создание исходного файла со стилями    
async function readCss(newpath){
  let data = await fsPromise.readFile(newpath,'utf-8')
  fsPromise.appendFile(path.join(filePathDist,'style.css'),data)
}
//Чтение папки с частями разметки
function readDirCOmponents(){
  fs.readdir(filePathHtml,{withFileTypes: true},(err,data)=>{
    if(err){throw err}
    data.forEach(async item=>{
      if(item.isFile()){
        let newPath =  path.join(filePathHtml,item.name)
        if(path.extname(newPath) === ".html"){
           let name = item.name.split('.')[0]
           let data = await fsPromise.readFile(newPath,'utf-8')
           copyHTML(data,name)
        }
      }
    })
 })
}
readDirCOmponents()
//создание копии исходного HTML файла
let file
async function create(){
  let fromPath =  path.resolve(__dirname,"./template.html")
  file = await fsPromise.readFile(fromPath,'utf-8')
}
create()
//создание итогового HTML файла
async function copyHTML(data,name){
  let copy = path.join(filePathDist,'./index.html')
  file = file.replace(`{{${name}}}`,data)
  fs.writeFile(copy,file,{encoding:'utf-8'},(err)=>{if(err)throw err})
}