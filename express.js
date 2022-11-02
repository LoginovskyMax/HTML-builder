const express = require("express")
const app = express()
const fs = require("fs")
app.get("/",function(req,res){
    res.send(`<h1>Server for txt-files</h1>
    <a href="http://localhost:3000/web">Web</a><br>
    <a href="http://localhost:3000/gamedev">Gamedev</a><br>
    <a href="http://localhost:3000/csharp">Csharp</a>`)
})
app.get("/web",function(req,res){
  fs.writeFile("web.txt","Its web page",{
    flag: "w",
    encoding: "utf-8"
},err=>{if(err)throw err
})
fs.readFile("web.txt","utf-8",(err,data)=>{
    if(err)throw err
    res.send(data)
})
})
app.get("/csharp",function(req,res){
    fs.writeFile("csharp.txt","Its csharp page",{
      flag: "w",
      encoding: "utf-8"
  },err=>{if(err)throw err
  })
  fs.readFile("csharp.txt","utf-8",(err,data)=>{
      if(err)throw err
      res.send(data)
  })
  })
  app.get("/gamedev",function(req,res){
    fs.writeFile("gamedev.txt","Its gamedev page",{
      flag: "w",
      encoding: "utf-8"
  },err=>{if(err)throw err
  })
  fs.readFile("gamedev.txt","utf-8",(err,data)=>{
      if(err)throw err
      res.send(data)
  })
  })


app.listen(3000,()=>{
    console.log("server is runnig on port 3000")
})
app.use(function (req, res) {
    res.status(404).send("Такого файла не существует")
})