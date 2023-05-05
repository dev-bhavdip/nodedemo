var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql2");
// const { Model } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");

const models = require("../models");

const com = models.comment;
const vid = models.videos;
const pht = models.photos;

const app = express();
const port = 3304;

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb",
  port: 3306,
});

const sequelize = new Sequelize(
  "mydb", //db name
  "root", // db user name
  "root", //db password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

con.connect(function (err) {
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
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

  app.get("/", async (req, res) => {
    await com.findOne({
        include: { model: pht, as: "img_id" },
      })
      .then((findedUser) => {
        // Get the User with Company datas included
        console.log("for photos table", findedUser.img_id);
        console.log("for comment table", findedUser);
        // Get the company record only
        // console.log(findedUser.company)
        res.render("new.ejs", findedUser);
      })
      .catch((err) => {
        console.log("Error while find comment with photo : ", err);
      });
  });
});
app.listen(port, () => console.log(`http://localhost:${port}`));
