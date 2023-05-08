const express = require("express");
var bodyparser = require("body-parser");
const controller = require("../controllers/controller");
let apis = controller.api;
const pst=controller.pst;
const router = express.Router();

let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

try {
  router.get("/", apis);
  router.post("/pst",pst);
} catch (err) {
  throw err;
}
module.exports = router;
