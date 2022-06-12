const express = require('express');
const path = require('path');
const app = express();
const nunjucks = require('nunjucks');

var port = 3000;

app.set("view engine", "html");
nunjucks.configure("./views", {
    express: app
})

app.get("/", (req,res) =>{
    res.render("home.html")
})

app.get("/list", (req,res) => {
    res.render("about.html");
})

app.get("/new", (req, res) => {
    res.render("post.html");
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})