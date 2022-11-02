const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require('path');
let filePath = path.resolve(__dirname,"./styles")
let filePath2 = path.resolve(__dirname,"./project-dist")
let filePath3 = path.join(filePath2,"./bundle.css")
//Проверка на сущетсвование файла
fs.access(filePath3,err=>{
    if(err){
        readDir()
        console.log('Успешно создано');
    }else{
        deleteDir(filePath2)
        readDir()
        console.log('Успешно обновнено');
    }
})
//Функция удаления файла
function deleteDir(pathTo){
fs.readdir(pathTo,(err,files)=>{
    if(err) {throw err}
    files.forEach(async file => {
        let pathFile = path.join(pathTo,file)
        if(path.extname(pathFile) === ".css"){
            try{
                await fsPromise.unlink(pathFile)
             }catch(err){
                 console.log(err);
             }
            }
    })
})
}
//Функция чтения попки со стилями
async function readDir(){
    let data = await fsPromise.readdir(filePath,{withFileTypes: true})
                     .catch(err=>console.log('Что то пошло не так'))
        data.forEach(item=>{
            if(item.isFile()){
            let newPath = path.join(filePath,item.name)
            if(path.extname(newPath) === ".css"){
                readCss(newPath)
            }
            }
        })
}
// добавление прочитанных стилей в финальный файл
async function readCss(newpath){
    let data = await fsPromise.readFile(newpath,'utf-8')
    fsPromise.appendFile(path.join(filePath2,'bundle.css'),data)
}

