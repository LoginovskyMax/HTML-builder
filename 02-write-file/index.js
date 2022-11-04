console.log('Введите ваш текст,чтобы закончить введите exit  или нажмите CTRL+C: ');
const process = require('process')
const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require('path');
let input  = process.stdin
let output  = process.stdout

//Если хотите чтобы файл обновлялся при новом запуске команды, раскомментируйте код ниже!!!

//удаление при следующем запуске
// fs.access(path.join(__dirname,'text.txt'),err=>{
//   if(!err){
//     fsPromise.unlink(path.join(__dirname,'text.txt'))
//   }
// })
//проверка ввода
input.on('data',data=>{
   writeData(data)
})
//запись ввода в файл
function writeData(data){
  if(data.toString().trim()=='exit'){
    process.exit()
  }
  fs.appendFile(path.join(__dirname,'text.txt'),data,err=>{
    if(err) throw err})
}
//проверка на выход через клавиши
process.on('SIGINT',()=>{
    process.exit()
})
//вывод прощания 
process.on('exit',()=>{output.write('bye bye')})