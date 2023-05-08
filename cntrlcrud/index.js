const express = require("express");
const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const { Model } = require("sequelize");
var bodyparser = require("body-parser");
const models = require("./models");
const controller = require("./controllers/controller");
const routes = require("./routes/route");

let sel_master = models.sel_masters;
let op_master = models.option_master;

let port = 3004;
let app = express();
app.use(bodyparser.json());
app.set('views', path.join(__dirname, 'views'))


try {
    app.use("/", routes);
    // app.use("/generatecontroller/op_mst", routes);
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
} catch (err) {
  throw err;
}
