import express from "express";
import next from "next";
import bodyParser from "body-parser";

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "salon_tablet",
        charset: "utf8mb4",
},
});
const Bookshelf = require('bookshelf')(knex)
const PostData = Bookshelf.Model.extend({
    tableName: "post_data",
});

function corsHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, application/json"
    );
}  

app.prepare().then(() => {

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/post_data/get/:page", (req, res) => {
        const pg = req.params.page
        console.log(
          "/post_data/get/:page の  req.body" + JSON.stringify(req.params.page)
        );

        new PostData()
            .orderBy("date", "desc")
            .fetchPage({ page: pg, pageSize: 5 })
            .then((result) => {
            const data = {
              rawData: result.toArray(),
              pagination: result.pagination,
            };
            res.send(data);
            // console.log(JSON.stringify(result));
            console.log(
              "/post_data/get/:page のresult.pagination " +
                JSON.stringify(result.pagination)
            );
          })
          .catch((err) => {
            console.log(JSON.stringify(err));

            res.status(500).json({ err: true, data: { message: err.message } });
          });
    });
   
    server.post("/post_data/create/post", (req, res) => {
        const { title, date, content } = req.body;
        new PostData({
          title: title,
          date: date,
          content: content,
        })
          .save()
          .then((result) => {
            console.log("create/postのresultは " + JSON.stringify(result));

            const data = {
              rawData: result,
              pagination: result.pagination,
            };
            console.log(JSON.stringify(data));
            res.send(data);
          })
          .catch((err) => {
            res.status(500).json({
              err: true,
              data: { message: err.message },
            });
          });
     });

     server.post("/post_data/get/singlepost", (req, res) => {
        new PostData().where('id', '=', req.body.id).fetch()
        .then((result) => {
            const data = { rawData: result };
            res.send(data)
        })
        .catch((err) => {
            console.log(JSON.stringify(err));
            
            res.status(500).json({err: true, data:{message: err.message}})
        })         
     });

    server.post("/post_data/update/post", (req, res) => {
        const {id, title, date, content} = req.body

        new PostData().where('id',id)
        .save({
            title: title,
            date: date,
            content: content,
        },{patch:true})
        .then((result) => {
            console.dir("updatepostのresultは " + JSON.stringify(result));
            const data = { rawData: result };
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                err: true,
                data: { message: err.message },
            });
        });         
     });

     server.post("/post_data/delete/post", (req, res) => {
       const id = req.body.id;
       new PostData()
        .where("id", id)
        .fetch()
        .then((record) => {
            record.destroy();
        })
        .then((result) => {
            const data = { rawData: result };
            res.send(data);
            })
        .catch((err) => {
            res.status(500).json({
                err: true,
                data: { message: err.message },
            });
        });        
     });

    server.post("/post_data/pagination"), (req, res) => {
        new PostData()
        .fetchPage({pageSize: 1})
        .then((result) => {
            const data = { pagination: result.pagination}
            res.send(data)
        })
        .catch((err) => {
            res.status(500).json({
                err: true,
                data: { message: err.message },
            });
        });   
    }

    //   -----------ここの上にバックエンドの処理を書く-----------

    // nextのルーティング
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
