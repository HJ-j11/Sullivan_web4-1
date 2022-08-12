const functions = require('firebase-functions');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const cryption = require('./config/encrpytion');
const logger = require('./config/logger');
const session = require('express-session');
const memoryStore = require('memorystore')(session);

const boardRouter = require('./routes/board');
const userRouter = require('./routes/login');

const app = express();
var port = 3000;

app.use('/', boardRouter);
app.use('/user', userRouter);

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

// firebase
const database = require("./config/firebase");
const { user } = require('firebase-functions/v1/auth');

app.get('/timestamp', (req, res) => {
    res.send(`${Date.now()}`);    
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})

exports.app = functions.https.onRequest(app);
