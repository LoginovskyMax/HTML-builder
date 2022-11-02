console.log('Введите ваш текст,чтобы закончить введите exit  или нажмите CTRL+C: ');
const process = require('process')
const fs = require("fs");
const path = require('path');
let input  = process.stdin
let output  = process.stdout

input.on('data',data=>{
   writeData(data)
})

function writeData(data){
    if(data.toString().trim()=='exit'){
        process.exit()
    }
    fs.appendFile(path.join(__dirname,'text.txt'),data,err=>{
        if(err) throw err})
}

process.on('SIGINT',()=>{
    process.exit()
})

process.on('exit',()=>{output.write('bye bye')})