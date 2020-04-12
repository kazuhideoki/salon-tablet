// @ts-ignore
const express = require("express");
// @ts-ignore
const next = require("next");
// @ts-ignore
const mysql = require("mysql")
// @ts-ignore
const bodyParser = require("body-parser");

// @ts-ignore
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

const mysqlSetting = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "salon_tablet",
}

app
  .prepare()
  .then(() => {
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/post_data/get", (req, res) => {
      const connection = mysql.createConnection(mysqlSetting);
      connection.connect(function (err) {
        if (err) throw err;

        connection.query("select * from post_data", function (
          err,
          result,
          fields
        ) {
          if (err) throw err;

          return res.send(result);
        });
      });
    });
    server.post("/post_data/update/content", (req, res) => {
        console.log(req.body);
        
      const connection = mysql.createConnection(mysqlSetting);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, application/json"
      );
      connection.connect(function (err) {
        if (err) throw err;
        const query =
          "update post_data set content='" +
          req.body.content +
          "' where id=" +
          req.body.id;
          connection.query(query, function (err, result, fields) {
          if (err) {
            res.send({ err: true, Message: "Error executing MySQL query" });
          }
          console.log(result);

          return res.send(result);
        });
      });
    });

    //   -----------ここの上にバックエンドの処理を書く-----------

    // nextのルーティングへ渡している？
    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(3000, (err) => {
      if (err) console.error(err.stack);
      console.debug("> Ready on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err.stack);
    // @ts-ignore
    process.exit(1);
  });
