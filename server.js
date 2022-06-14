const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const morgan = require('morgan');
const {logger} = require('./config/logger');
const session = require('express-session');
const memoryStore = require('memorystore')(session);

const app = express();
var port = 3000;

// css, js 경로
app.use(express.static('public'));
// bodyParser 이용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//session
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store : new memoryStore({
            checkPeriod: 86400000,
        }),
        cookie: {maxAge: 86400000},
    })
);

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

app.post("/login", (req, res) => {
    var userId = req.body.inputId;
    var password = req.body.inputPassword;

    conn.query(`SELECT USER_ID, UID, PASSWORD, NAME FROM USER_TB WHERE UID=?`,
    [userId], function(err, data) {
        if(err) throw err;
        if(data.length==0) {
            res.redirect('/');
        } else {
            salt = data[0].salt;
            var pwd = data[0].password;
            const hashPassword = crypto.createHash('sha512').update(password+salt).digest('hex');
            if(password === hashPassword) {
                res.send('<script>alert("로그인 성공했습니다")</script>');
                res.redirect('/');        
            } else {
                res.redirect('/login');
            }
        }
    });

})


app.post('/write', (req, res) => {
    var user = req.body.writer;
    var title = req.body.title;
    var contents = req.body.contents;
    var section = req.body.section;

    var session = req.body.session;
    // 세션 id 체크
    console.log(`session : ${session}`);

    console.log(`${user}, ${contents}, ${section}`);
    
    var sql = `INSERT INTO USER_BOARD (USER_ID, TITLE, CONTENTS, REGDATE) VALUES (?, ?, ?, ?)`;
    
    conn.query(sql, [user, title, contents, new Date()], function(err, data){
        if(err) {
            res.send('<script>alert("다시 시도해주세요!")</script>');
            throw err
        };
        res.redirect('/');
    })
})

app.post('/join', (req, res) => {
    var name = req.body.inputName;
    var id = req.body.inputId;
    var password = req.body.inputPassword;
    var phone = req.body.inputPhone;
    var email = req.body.inputEmail;
    
    const hashPassword = crypto.createHash('sha512' + salt ).update(password).digest('hex');
    var checkSql = `SELECT UID FROM USER_TB WHERE UID = ?`;

    conn.query(checkSql, [id], function(err, rows) {
        if(err) {
            
        }

        if(rows.length == 0 ) {
            var sql = `INSERT INTO USER_TB (USER_NAME, UID, PASSWORD, SALT, PHONE, EMAIL, REGDATE) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            conn.query(sql, [name, id, hashPassword, salt, phone, email, new Date()], function(err, data){
                if(err) {
                    res.send('<script>alert("join failed!")</script>');
                    throw err;
                }
                res.send('<script>alert("등록 되었습니다!")</script>');
                res.redirect('/');
            })
        } else {
            res.send('<script>alert("이미 있는 아이디 입니다.")<script>');
            res.redirect('/login');
        }
    })
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})