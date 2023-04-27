const express = require("express");
const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");

let app = express();
let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql",
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

conn.connect(function (err) {
  if (err) throw err;
  app.get("/connect", async (req, res) => {
    const Op = Sequelize.Op;

    await sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        res.render("register.ejs");
      })
      .catch((error) => {
        console.error("Unable to connect to the database: ", error);
      });
  });

  app.get("/create", (req, res) => {
    // create table using sequelize
    const Book = sequelize.define("bank", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acc_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATEONLY,
      },
      acc_type: {
        type: DataTypes.STRING,
      },
    });
    
    Book.beforeCreate(async (user, options) => {
     console.log("complete");
    });
   
    res.send("table created");
    sequelize.sync();
  });

  sequelize.sync().then(() => {
    app.get("/insert?", async (req, ress) => {
      // insert into database
      const Book = sequelize.define("bank", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        acc_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.DATEONLY,
        },
        acc_type: {
          type: DataTypes.STRING,
        },
      });

      let namee = req.query.name;
      let acc_numberr = req.query.acc_number;
      let acc_typee = req.query.acc_type;

      console.log(
        "name=",
        namee + "acc_number=",
        acc_numberr + "acc_type=",
        acc_typee
      );
      await Book.create({
        name: `${namee}`,
        acc_number: `${acc_numberr}`,
        release_date: "03-20-2023",
        acc_type: `${acc_typee}`,
      })
        .then((res) => {
          console.log(res);
          ress.send("data inserted");
        })
        .catch((error) => {
          console.error("Failed to create a new record : ", error);
        });
    });

    app.get("/select", (req, ress) => {
      //   all data
      const Book = sequelize.define("bank", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        acc_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.DATEONLY,
        },
        acc_type: {
          type: DataTypes.STRING,
        },
      });

      Book.findAll()
        .then((res) => {
          console.log("all data", res);
          ress.send("data fetched");
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
        
    });

    app.get("/delete?", (req, ress) => {
      const Book = sequelize.define("bank", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        acc_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.DATEONLY,
        },
        acc_type: {
          type: DataTypes.STRING,
        },
      });
      Book.destroy({
        where: {
          id: 2,
        },
      })
        .then(() => {
          console.log("sucessfully record deleted");
          ress.send("sucessfully record deleted");
        })
        .catch((error) => {
          console.error("failed to delete a record:", error);
        });
    });

    app.get("/update?", (req, res) => {
      const Book = sequelize.define("bank", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        acc_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.DATEONLY,
        },
        acc_type: {
          type: DataTypes.STRING,
        },
      });

      Book.update(
        {
          name: "xyz",
        },
        {
          where: {
            id: 1,
          },
        }
      )
        .then(() => {
          res.send("data updated ");
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
});

app.listen(3003, () => console.log(`http://localhost:3003/connect`));
