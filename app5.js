const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sfv.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "ストリータファイター5キャラクター情報へようこそ";
  res.render('show', {mes:message});
});
app.get("/sfv", (req, res) => {
    db.serialize( () => {
        db.all("select id, 名前, 性別, 体力値, スタン値, 使用順位 from test;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('sfv', {data:row});
        })
    })
});
app.get("/use", (req, res) => {
  let desc = "";
  if( req.query.desc ) desc = " desc";
  let sql = "select id, 名前, 性別, 体力値, スタン値, 使用順位 from test order by 使用順位" + desc + " limit " + req.query.pop + ";";
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('sfv', {data:data});
    })
  })
})
app.get("/hp", (req, res) => {
  let desc = "";
  if( req.query.desc ) desc = " desc";
  let sql = "select id, 名前, 体力値, スタン値 from test order by 体力値" + desc + " limit " + req.query.pop + ";";
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('sfv_hpstan', {data:data});
    })
  })
})
app.get("/stan", (req, res) => {
  let desc = "";
  if( req.query.desc ) desc = " desc";
  let sql = "select id, 名前, 体力値, スタン値 from test order by スタン値" + desc + " limit " + req.query.pop + ";";
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('sfv_hpstan', {data:data});
    })
  })
})
app.get("/gender", (req, res) => {
  let sql = "select id, 名前, 性別 from test where 性別 = '" + req.query.gender + "';";
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('gender', {data:data});
    })
  })
})

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
