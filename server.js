const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

var port = 3000;

// css, js 경로
app.use(express.static('public'));
// bodyParser 이용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engines
app.set("view engine", "html");
nunjucks.configure("./views", {
    express: app
})

// maria db connect
const maria = require('./database/connect/maria');
const conn = require('./database/connect/maria');
maria.connect();

// URL
app.get("/", (req,res) =>{
    res.render("home.html")
})

app.get("/list", (req,res) => {
    var sql = `SELECT * FROM board`;
    conn.query(sql, function(err, data) {
        if(err) throw err;
        console.log(data);
        res.render("about.html", {data: data});
    })
})

app.get("/new", (req, res) => {
    res.render("post.html");
})

app.post('/write', (req, res) => {
    var user = req.body.writer;
    var title = req.body.title;
    var contents = req.body.contents;
    var section = req.body.section;
    console.log(`${user}, ${contents}, ${section}`);
    
    var sql = `INSERT INTO board (USER_ID, TITLE, CONTENTS, TIMESTAMP) VALUES (?, ?, ?, ?)`;
    
    conn.query(sql, [user, title, contents, new Date()], function(err, data){
        if(err) throw err;
        res.redirect('/');
    })


})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})