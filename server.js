const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

var port = 3000;

app.set("view engine", "html");
nunjucks.configure("./views", {
    express: app
})

// maria db connect
const maria = require('./database/connect/maria');
maria.connect();

// css, js 경로
app.use(express.static('public'));


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