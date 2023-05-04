const express = require("express");
const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const comment = require("./models/comment");
const photos = require("./models/photos");
const videos = require("./models/videos");
const { Model } = require("sequelize");
var bodyparser = require("body-parser");
const models = require("./models");

const com = models.comment;
const vid = models.videos;
const pht = models.photos;

let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql",
  port: 3306,
});

const port = 3304;
const sequelize = new Sequelize(
  "mydb", //db name
  "root", // db user name
  "root", //db password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

conn.connect(function (err) {
  const video = sequelize.define("videos", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },

    text: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  // comment
  const comment = sequelize.define("comments", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    commentableId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "videos",
        key: "id",
      },
      // references:{
      //   model: "photos",
      //   key: "id",
      // }
    },
    commentableType: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  // image
  const photo = sequelize.define("photos", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },

    url: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  if (err) throw err;
  console.log("Connected!");
  app.get("/", async (req, res) => {
    console.log("Connected! first api");
  });
  const Op = Sequelize.Op;

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

  app.post("/comment", async (req, res) => {
    sequelize.sync().then(() => {
      let title = req.body.title;
      let comentid = req.body.comid;
      let comtype = req.body.comtype;
      console.log("title= ", title);
      console.log("title= ", comentid);
      console.log("title= ", comtype);
      comment.create(
        {
          title: `${title}`,
          commentableId: comentid,
          commentableType: `${comtype}`,
        }
        // { title: "get title new", commentableId: 3, commentableType: "video" }
      );
    });
  });
  app.post("/image", async (req, res) => {
    let title = req.body.imgtitle;
    console.log("title= ", title);
    let url = req.body.url;
    console.log("title= ", url);

    photo.create(
      {
        title: `${title}`,
        url: `${url}`,
      }
      //   { title: "get title", url: "get url" }
    );
  });
  app.post("/video", async (req, res) => {
    let title = req.body.vidtitle;
    let text = req.body.text;
    console.log("title= ", title);
    console.log("title= ", text);

    comment.create(
      {
        title: `${title}`,
        text: `${text}`,
      }
      //   { title: "video title", text: "video text get" }
    );
  });

  app.get("/select", async (req, res) => {
    // comment with photo
    await com
      .findAll()
      .then((findedUser) => {
        // Get the User with Company datas included
        // console.log("for photos table", findedUser.img_id);
        // console.log("for comment table", findedUser);
        // Get the company record only
        console.log(findedUser[0].id);
        console.log("all data", findedUser);

        res.render("new.ejs", { findus: findedUser });
      })
      .catch((err) => {
        console.log("Error while find comment with photo : ", err);
      });
  });

  // for one to many
  app.get("/select1", async (req, res) => {
    // comment with photo
    await com
      .findAll({
       
        include: { model: vid, as: "v_id" },
      })
      .then((findedUser) => {
        // console.log(findedUser[0].id);
        console.log("all data", findedUser[0].id);

        res.render("onetomany.ejs", { findus: findedUser });
      })
      .catch((err) => {
        console.log("Error while find comment  : ", err);
      });
  });

  // for many to many
   // for one to many
   app.get("/select2", async (req, res) => {
    // comment with photo
    await com
      .findAll({
       
        include:[ { model: vid, as: "v_id" },{model:pht,as:"img_id"}]
      })
      .then((findedUser) => {
        // console.log(findedUser[0].id);
        console.log("all data", findedUser[0].id);

        res.render("onetomany.ejs", { findus: findedUser });
      })
      .catch((err) => {
        console.log("Error while find comment  : ", err);
      });
  });


  app.post("/update", async (req, res) => {
    await com
      .update({ title: "new uri" }, { where: { id: 2 } })
      .then(() => {
        console.log("updated data");
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
});
app.listen(port, () => console.log(`http://localhost:${port}`));
// });
