console.log("hello world");
const { Sequelize, DataTypes } = require("sequelize");

// var mysql = require('mysql2');
var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql2");

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

// connect to the database
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

  app.get("/", async function (req, res) {
    const data = await queryExecuter("select * from books");
    // console.log(data);
    console.log("get request");
    // res.render("register", { data });
  });
  app.get("/like?", async function (req, ress) {
    let inp_name = req.query.like;
    let data;

    Book.findAll({
      where: {
        title: {
          [Op.like]: `%${inp_name}%`,
        },
      },
      limit: 10,
    })

      .then((res) => {
        console.log("where like data", res);
        ress.send(res);
      })
      .catch((error) => {
        console.error("failed to retrive", error);
      });
  });

  async function queryExecuter(query) {
    return new Promise((resolve, rejects) => {
      con.query(query, (err, res) => {
        if (err) {
          rejects(err);
        }
        resolve(res);
      });
    });
  }
});

const Op = Sequelize.Op;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// create table using sequelize

const Book = sequelize.define("books", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
  },
});

sequelize.sync().then(() => {
  console.log("Book table created successfully!");

  // insert into database
  Book.create({
    title: "Clean Code",
    author: "Robert Cecil Martin",
    release_date: "2021-12-14",
    subject: 3,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error("Failed to create a new record : ", error);
    });

  // select from database
  app.get("/pagin?",async function (req, ress) {
    let pagee=req.query.page;
    let limit=10;
    console.log("page=",pagee);
    var off = (pagee - 1) * limit;

   await Book.findAll({
      offset: off,
      limit: 10,
      order: [
        // Will escape full_name and validate DESC against a list of valid direction parameters
        ["id", "ASC"],
      ],
    })
      .then((res) => {
        // console.log("select data", res);
        ress.send(res)
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  });

  //   all data
  Book.findAndCountAll()
    .then((res) => {
      console.log("all data", res.count);
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });

  // for specific data usign where condition
  Book.findOne({
    where: {
      title: {
        [Op.like]: "%ab%",
      },
    },
  })
    .then((res) => {
      // console.log("where like data", res);
    })
    .catch((error) => {
      console.error("failed to retrive", error);
    });

  // for delete specific records
  Book.destroy({
    where: {
      id: 13,
    },
  })
    .then(() => {
      // console.log("sucessfully record deleted");
    })
    .catch((error) => {
      console.error("failed to delete a record:", error);
    });

  //   update record data
  //   Book.update({ author: "a very different title now" }, { where: { id: 6 } })
  //     .then(() => {
  //       console.log("updated data");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   //   end of create table
  // })
  // .catch((error) => {
  //   console.error("Unable to create table : ", error);
  app.listen(port, () => console.log(`http://localhost:${port}`));

});
