// console.log("hello world")
// const lib = require('./library/loggger')
// lib.loggger("hello")       
// const express = require("express")
// const app = express()
// app.get("/",function(req,res){
//     res.end("hello,world2222")
// })
// app.listen(3000,()=>{
//     console.log("server is runnig on port 3000")
// })

//работа с http
// let http = require("http"),
// {URL} =  require("url")
// const server = http.createServer((request,response)=>{
//     let parsedUrl = new URL("http://localhost:3000"+request.url)
//     if(parsedUrl.searchParams.has("name")){
//         response.end(`hello, ${parsedUrl.searchParams.get("name")}`)
//     }else{
//         response.write("Server is working")
//         response.end()
//     }
//     console.log(parsedUrl)

// })
// server.listen(3000)


// fs.open("example.txt","r",(err,fd)=>{
//     if(err){throw err}
//     console.log(fd)
// })
// fs.writeFile("ex2.txt","New Data",{
//     flag: "w",
//     encoding: "utf-8"
// },err=>{if(err)throw err
// console.log("sucsess!")
// })

// fs.readFile("example.txt","utf-8",(err,data)=>{
//     if(err)throw err
//     console.log(data)
// })

// const fs = require("fs")
//     fs.readFile("jsonfile.json","utf-8",(err,data)=>{
//         if(err)throw err
//         console.log(data)
//         let users = JSON.parse(data)
// users.push({
//     name:"Alice",
//     age: 25
// })
// fs.writeFile("jsonfile.json",JSON.stringify(users),err=>{
//     if(err)throw err
//     console.log("Successfuly written")
// })
// })

// fs.readFile("example.txt","utf-8",(err,data)=>{
//         if(err)throw err
//         console.log(data)
//         let numbers = "1234567890",
//         count = 0
//         for(let i = 0;i<=data.length;i++){
//             if(numbers.indexOf(data[i])>=0){
//                 count++
//          }
//         }
//         console.log(count)
//     })

// fs.readFile("example.txt","utf-8",(err,data)=>{
//         if(err)throw err
//         let Newdata = new Date()
//     let Newtext = data + " "+ Newdata.toLocaleDateString()
// fs.writeFile("example.txt",Newtext,err=>{
//     if(err)throw err
//     console.log("Successfuly written")
// })
// })

let express = require("express"),
app = express(),
port = process.env.PORT || 3000,
path = require("path") 
const fs = require("fs")

app.use(express.static("static"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Сервер работает")
})
app.get("/query",(req,res)=>{
    res.send("OK")  
})
app.get("/path",(req,res)=>{
    let indexFile = path.resolve(__dirname,"file.html")
    res.sendFile(indexFile)
})
app.post("/query",(req,res)=>{
    console.log(req.body)
    fs.readFile("users.json","utf-8",(err,data)=>{
                if(err)throw err
                let users = JSON.parse(data)
        users.push(req.body)
        fs.writeFile("users.json",JSON.stringify(users),err=>{
            if(err)throw err
            console.log("Successfuly written")
            res.send("OK!")
        })
    })

})
app.post("/book",(req,res)=>{
    console.log(req.body)
    fs.readFile("book.json","utf-8",(err,data)=>{
                if(err)throw err
                let users = JSON.parse(data)
        users.push(req.body)
        fs.writeFile("book.json",JSON.stringify(users),err=>{
            if(err)throw err
            console.log("Successfuly written")
            res.send("OK!")
        })
    })

})
app.get("/book", (req, res) => {
    res.sendFile(path.resolve(__dirname, "book.json"));
})
app.listen(port,()=>console.log("Server is runnig"))




