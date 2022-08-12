const express = require('express');
const cryption = require('./config/encrpytion');
const router = express.Router();

router.get("/signup", (req,res) => {
    res.render("signup.html");
})

router.get("/login", (req,res) => {
    res.render("login.html");
})

router.post("/login", (req, res) => {
    var userId = req.body.inputId;
    var password = req.body.inputPassword;
    console.log(`userid : ${userId}, pwd: ${password}`);
    
    conn.query(`SELECT USER_ID, UID, PASSWORD, NAME FROM USER_TB WHERE UID=?`,
    [userId], function(err, data) {
        if(err) throw err;
        if(data.length==0) {
            console.log('Not Member');
            res.redirect('/');
        } else {
            let decryptedData = cryption.decrypte(data[0].password);
            if(password === decryptedData) {
                console.log('login successful');
                res.redirect('/');        
            } else {
                console.log('login failed');
                res.redirect('/login');
            }
        }
    });

})

router.get("/logout", (req, res) => {
    req.session.destroy( err => {
        if(err) {
            return res.status.send("<h1>500 error</h1>");
        }
        res.redirect("/");
    })
});




router.post('/join', (req, res) => {
    var name = req.body.inputName;
    var id = req.body.inputId;
    var password = req.body.inputPassword;
    var phone = req.body.inputPhone;
    var email = req.body.inputEmail;

    var checkSql = `SELECT UID FROM USER_TB WHERE UID = ?`;

    conn.query(checkSql, [id], function(err, rows) {
        if(err) {
            
        }

        if(rows.length == 0 ) {
            let encryptedData = cryption.encrypte(password);

            var sql = `INSERT INTO USER_TB (USER_NAME, UID, PASSWORD, PHONE, EMAIL, REGDATE) VALUES (?, ?, ?, ?, ?, ?)`;
            conn.query(sql, [name, id, encryptedData, phone, email, new Date()], function(err, data){
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

module.exports = router;