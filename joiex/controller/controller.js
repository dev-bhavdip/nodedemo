const express = require("express");
const joi = require("joi");
var bodyparser = require("body-parser");

let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

let home = async function home(req, res, next) {
  res.render("home.ejs");
};

let valid = async function valid(req, res, next) {
  let u_name = req.body.u_name;
  let u_mail = req.body.u_mail;

  console.log("user data", u_name, "email", u_mail);
  function validateuser(user) {
    const joiScema = joi
      .object({
        username: joi.string().required().min(3).max(5),
        email: joi.string().required().email().min(5).max(50),
        date_of_birth: joi.date().optional(),
        account_status: joi
          .string()
          .valid("activated")
          .valid("unactivated")
          .optional(),
      })
      .options({ abortEarly: false });
    return joiScema.validate(user);
  }

  const user = {
    username: u_name,
    email: u_mail,
    date_of_birth: "2023-05-05",
    account_status: "activated",
  };

  response = validateuser(user);

  if (response.error) {
    console.log(response.error.details);
    res.render("error.ejs");

  } else {
    console.log("validate user");
    res.render("index.ejs",{uname:u_name,umail:u_mail});
  }
};

module.exports = { home, valid };
