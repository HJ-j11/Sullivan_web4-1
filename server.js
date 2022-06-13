const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const crypto = require('crypto');
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
    var sql = `SELECT * FROM USER_BOARD`;
    conn.query(sql, function(err, data) {
        if(err) throw err;
        console.log(data);
        res.render("about.html", {data: data});
    })
})

app.get("/new", (req, res) => {
    res.render("post.html");
})

app.get("/signup", (req,res) => {
    res.render("signup.html");
})
app.get("/login", (req,res) => {
    res.render("login.html");
})

app.post('/write', (req, res) => {
    var user = req.body.writer;
    var title = req.body.title;
    var contents = req.body.contents;
    var section = req.body.section;
    console.log(`${user}, ${contents}, ${section}`);
    
    var sql = `INSERT INTO USER_BOARD (USER_ID, TITLE, CONTENTS, REGDATE) VALUES (?, ?, ?, ?)`;
    
    conn.query(sql, [user, title, contents, new Date()], function(err, data){
        if(err) throw err;
        res.redirect('/');
    })
})

app.post('/join', (req, res) => {
    var name = req.body.inputName;
    var id = req.body.inputId;
    var password = req.body.inputPassword;
    var phone = req.body.inputPhone;
    
    const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');
    var checkSql = `SELECT UID FROM USER_TB WHERE UID=${id}`;
    conn.query(checkSql, function(err, rows) {
        if(rows.length==0) {
            var sql = `INSERT INTO USER_TB (USER_NAME, UID, PASSWORD, PHONE, REGDATE) VALUES (?, ?, ?, ?, ?)`;
            conn.query(sql, [name, id, hashPassword, phone, new Date()], function(err, data){
                if(err) throw err;
                res.redirect('/login');
            })
        }
    })
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})