// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
// const path = require('path');

// app.use(express.static("static"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//     let indexFile = path.resolve(__dirname, "index.html");
//     console.log(indexFile);
//     res.sendFile(indexFile);
// })

// app.get("/path", (req, res) => {
//     res.send("Мой путь");
// })

// app.get("/favicon.ico", (req, res) => {
//     let faviconFile = path.resolve(__dirname, "icon.png");
//     res.sendFile(faviconFile);
// })

// // app.get("/query", (req, res) => {
// //     console.log(req.query);
// //     res.send(`Hello, ${req.query.login}`);
// // })

// app.post("/query", (req, res) => {
//     console.log(req.body);
//     res.send("Ok");
// })

// app.get("/items/:title", function (req, res) {
//     console.log(req.params.title)
//     res.send("OK")
// })


// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })

// app.use(function (req, res) {
//     res.status(404).send("<h1>404</h1>")
// })

/*
    /book/:id
    /book/1
*/

const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("static"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
})

app.get("/shop", (req, res) => {
    res.sendFile(path.resolve(__dirname, "shop.json"));
})

app.get("/item/:id", (req, res) => {
    fs.readFile("shop.json", (err, data) => {
        if (err) throw err;
        let items = JSON.parse(data);
        items.forEach(item => {
            if (item.id == req.params.id) {
                res.send(JSON.stringify(item));
            }
        });
    })
})

app.listen(3000, () => {
    console.log("Server is working");
})