const express = require("express");
var bodyparser = require("body-parser");
const controller = require("../controllers/controller");
let genctrl = controller.genctrls;
let home = controller.home;
let op_mst = controller.op_mst;
let selectdb = controller.selectdb;
let option = controller.option;
const router = express.Router();

let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

try {
  // basic api
  router.get("/", home);
  router.post("/generatecontroller", genctrl);
  //for update
  router.post("/update_optn", op_mst);
  //   for select
  router.post("/selectmaster", selectdb);
  router.post("/optionmaster", option);
} catch (err) {
  throw err;
}
module.exports = router;
