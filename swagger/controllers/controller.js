const express = require("express");
var bodyparser = require("body-parser");
let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

try {
  let api = async function api(req, res, next) {
    res.send("sucessfull");
  };
  let pst = async function pst(req, res, next) {
    res.send("this is from post request");
  };
  module.exports = { api ,pst};
} catch (err) {
  throw err;
}
