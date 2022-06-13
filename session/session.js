const http = require('http');
const express = require('express');
const session = require('express-session');
const memoryStore = require('memorystore')(session);

const app = express();

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store : new MemoryStore({
            checkPeriod: 86400000,
        }),
        cookie: {maxAge: 86400000},
    })
);

module.exports = session;