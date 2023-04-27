const models = require("./models");
const User = models.Users;
const Company = models.Company;
const WorkingDay = models.WorkingDay;
const usworkingday = models.UsersWorkingDay;
const { Sequelize, DataTypes } = require("sequelize");

var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql2");
// const workingday = require("./models/workingday");

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
  if (err) throw err;
  console.log("Connected!");

  app.get("/", function (req, res) {
    res.send("welcome to CRUD");
  });

  app.post("/select", async function (req, res) {
    // 1
    
    User.findOne({
      where: { email: "john-connor@domain.com" },
      include: "company",
    })
      .then((findedUser) => {
        // Get the User with Company datas included
        console.log("first find one", findedUser);
        // Get the company record only
        // console.log(findedUser.company)
      })
      .catch((err) => {
        console.log("Error while find user : ", err);
      }),
      Company.findByPk(1, { include: ["employes"] })
        .then((company) => {
          // Get the Company with Users (employes) datas included
          console.log("second find by pk", company);
          // Get the Users (employes) records only
          // console.log(company.get().employes)
        })
        .catch((err) => {
          console.log("Error while find company : ", err);
        }),
      usworkingday
        .findAll({ include: { model: User, as: "User" }, where: { id: 28 } })
        .then((res) => {
          console.log("data is fetched for User", res);
        })
        .catch((err) => {
          console.log(err, "find error");
        }),
      User.findAll({
        include: { model: Company, as: "company" },
        where: { id: 3 },
      })

        .then((res) => {
          console.log("data is fetched", res);
        })
        .catch((err) => {
          console.log(err);
        });
    res.send("selected data");
  });

  app.post("/create", async function (req, res) {
    let email1 = req.body.email;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let c_id = req.body.c_id;
    let w_day = req.body.w_day;

    console.log("email=", email1);
    // Company.create({
    //   name: "eSparkBiz",
    // });
    WorkingDay.create({
      weekDay: "FriDay",
      workingDate: Date(),
      isWorking: 1,
    });
    try {
      User.create(
        {
          email: `${email1}`,
          firstName: `${fname}`,
          lastName: `${lname}`,
          companyId: `${c_id}`,
          days: [
            { weekDay: `${w_day}`, isWorking: 1 },
            { weekDay: `${w_day}`, isWorking: 1 },
            { weekDay: `${w_day}`, isWorking: 1 },
            { weekDay: `${w_day}`, isWorking: 1 },
          ],
          // company:[{companyId:93}]
        },
        {
          include: { model: WorkingDay, as: "days" },
          // include: { model: Company, as: "company" }
        }
      );
    } catch (err) {
      console.log("error in create", err);
    }

    usworkingday.create({
      userId: 2,
      workingDayId: 1,
    });
    res.send("inserted data");
  });

  app.post("/update", async function (req, res) {
    let email1 = req.body.email;
    let fname = req.body.fname;
    let lname = req.body.lanme;
    let c_id = req.body.c_id;
    let w_day = req.body.w_day;
    let c_name = req.body.c_name;
    let u_id = req.body.u_id;
console.log("user id=",u_id);

    const data =await  User.findOne({ where: { id: `${u_id}` } });
    const cmp_id = data.companyId;

    console.log("company name=", data.companyId);
    await User.update({ firstName: `${fname}`,company:{name:"ohm"} ,include:[{model:Company,as:"company"}]}, { where: { id: `${u_id}` } })
      .then(() => {
        Company.update(
          { name: `${c_name}` },
          { where: { id: `${cmp_id}` } }
        ).catch((error) => {
          console.log(error);
        });
        console.log("updated data");
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((error) => {
        console.log("unable to create table:", error);
      });
    res.send("updated data");
  });
});



// Get the employees for a given company

app.listen(port, () => console.log(`http://localhost:${port}`));
