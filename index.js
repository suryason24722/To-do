const express = require('express')
const app = express()
const path = require('path') //requiring path module
const fs = require('fs')

app.set("views", path.join(__dirname, "views"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))     //setting up parsers for form
app.use(express.static(path.join(__dirname, 'public'))) //har request ke liye static files(images,stylesheets,javascripts) yahan dhundna
app.set('view engine', 'ejs')     //to render ejs pages

app.get("/", function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index", { files: files })    //rendering index.ejs 

    })

})

app.post("/create", function (req, res) {
    // console.log(req.body); //to get an array of form details on console/terminal
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {  //to create a file
        res.redirect("/")
    })

})

app.get("/file/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        // console.log(filedata);
        res.render('show', { filename: req.params.filename, filedata: filedata })

    })
})

// app.get("/profile/:username", function (req, res) {
//     res.send(`welcome ,${req.params.username}`)
// })

// app.get("/author/:name/:age", function (req, res) {
//     res.send(`welcome , ${req.params.name} of age ${req.params.age}`)
//     // res.send(req.params)     //an object
// })

app.listen(3000, function (req, res) {
    console.log("its running");

})



