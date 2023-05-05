const express = require("express");
const joi = require("joi");
var bodyparser = require("body-parser");
let home=require('./routes/route');
let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
let port=3004;


app.use('/',home);

app.listen(port, () => console.log(`http://localhost:${port}`));
