const express = require('express');
const router = express.Router();


router.get("/", (req,res) =>{
    res.render("index.html")
})

router.get("/list", (req,res) => {
    var sql = `SELECT * FROM USER_BOARD`;
    conn.query(sql, function(err, data) {
        if(err) throw err;
        console.log(data);
        res.render("about.html", {data: data});
    })
})

router.get("/new", (req, res) => {
    res.render("post.html");
})

router.post('/write', (req, res) => {
    var user = req.body.writer;
    var title = req.body.title;
    var contents = req.body.contents;
    var section = req.body.section;

    var session = req.body.session;
    // 세션 id 체크
    console.log(`session : ${session}`);

    console.log(`${user}, ${contents}, ${section}`);

    if(!session) {
        res.redirect('/login');
    } else {
        var sql = `INSERT INTO USER_BOARD (USER_ID, TITLE, CONTENTS, REGDATE) VALUES (?, ?, ?, ?)`;
    
        conn.query(sql, [user, title, contents, new Date()], function(err, data){
            if(err) {
                res.send('<script>alert("다시 시도해주세요!")</script>');
                throw err
            };
            res.redirect('/');
        })
    }

    
})


module.exports = router;