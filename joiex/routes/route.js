const express = require("express");
const joi = require("joi");
var bodyparser = require("body-parser");
const controller = require("../controller/controller");
let home = controller.home;
let valid = controller.valid;
const router = express.Router()

let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

router.route("/").get(home);
router.route("/index.ejs").post(valid);
module.exports = router;