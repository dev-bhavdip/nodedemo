const express = require("express");
var bodyparser = require("body-parser");
const model = require("../models");
let select_master = model.select_master;
let option_master = model.option_master;
let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

try {
  let genctrls = async function genctrl(req, res, next) {
    let type = req.body.type;
    let multiallow = req.body.multiallow;
    let ctrlkey = req.body.ctrlkey;
    let option = req.body.op_value;
    // sequelize start
    let add = await select_master.create({
      type: req.body.type,
      multiallow: req.body.multiallow,
      ctrl_key: req.body.ctrlkey,
    });

    // for option master
    let lenop = option.length;
    console.log("length=", option.length);
    for (let a = 0; a < lenop; a++) {
      let add2 = await option_master.bulkCreate([
        {
          s_id: add.id,
          op_value: option[a],
        },
      ]);
    }
    console.log(type == "select" && multiallow == 0);
    var htmlrt = "";
    // checkbox
    if (type == "checkbox" && multiallow == 0) {
      for (let a = 0; a < lenop; a++) {
        htmlrt += `<input type="checkbox" name='${ctrlkey}' id=""value='${option[a]}' />
    <label for="checkbox">${option[a]}</label>`;
      }
    } else if (type == "checkbox" && multiallow == 1) {
      for (let a = 0; a < lenop; a++) {
        htmlrt += `<input type="checkbox" name='${ctrlkey}' id=""value='${option[a]}' />
        <label for="checkbox">${option[a]}</label>`;
      }
    }

    // for radio
    else if (type == "radio" && multiallow == 1) {
      for (let a = 0; a < lenop; a++) {
        htmlrt += `<input type="radio" name='${ctrlkey}' id=""value="${option[a]}" />
        <label for="radio">data</label>`;
      }
    } else if (type == "radio" && multiallow == 0) {
      for (let a = 0; a < lenop; a++) {
        htmlrt += `<input type="radio" name='${ctrlkey}' id=""value="${option[a]}" />
            <label for="radio">data</label>`;
      }
    }
    // for drop down list
    else if (type == "select" && multiallow == 0) {
      htmlrt = `<select name='${ctrlkey}' id="" >`;
      for (let a = 0; a < lenop; a++) {
        htmlrt += `<option value="${option[a]}">${option[a]}</option>`;
      }
      htmlrt += `</select>`;
    } else if ((type = "select" && multiallow == 1)) {
      htmlrt = `<select name='${ctrlkey}' id="" multiple >`;
      for (let a = 0; a < lenop; a++) {
        htmlrt += `<option value="${option[a]}">${option[a]}</option>`;
      }
      htmlrt += `</select>`;
    } else {
      console.log("you have nothing to select");
    }

    // res.send(htmlrt);

    // sequelize end

    res.render("ctrladd.ejs", {
      add: add,
      type: type,
      multiallow: multiallow,
      ctrlkey: ctrlkey,
      lenop: lenop,
      option: option,
    });
  };

  // for option master start
  let op_mst = async function op_mst(req, res, next) {
    let up_opvalue = req.body.up_opvalue;
    let updata = req.body.updata;
    let addop = await option_master.update(
      { op_value: updata },
      { where: { s_id: up_opvalue } }
    );
  };
  //   for option master end

  //   read data
  var datasele_mstr;
  let selectdb = async function selectdb(req, res, next) {
    const data = await select_master.findAll();
    console.log(data.length);
    datasele_mstr = ``;
    res.send();
  };
  let option = async function option(req, res, next) {
    const data1 = await option_master.findAll();
    console.log(data1.length);
    res.send(data1);
  };

  let home = async function home(req, res, next) {
    res.render("home.ejs");
  };

  module.exports = { genctrls, home, op_mst, selectdb, option };
} catch (err) {
  throw err;
}

// for option master
