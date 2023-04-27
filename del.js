const { Sequelize, DataTypes } = require("sequelize");

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

const Op = Sequelize.Op;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// raw query
const { QueryTypes } = require("sequelize");
async function a() {
  const abc = await sequelize.query(`SELECT * FROM books where title LIKE '%bc%' or author like '%a very%' `, {
    replacements: ["active"],
    type: QueryTypes.SELECT,
  });
  console.log("books data", abc);
}
a();
// raw query end

// create table using sequelize
const Book = sequelize.define(
  "books",
  {
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
  },
  {
    sequelize,
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
  }
);

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
});

Book.destroy({
  where: {
    id: 13,
  },
})
  .then(() => {
    console.log("sucessfully record deleted");
  })
  .catch((error) => {
    console.error("failed to delete a record:", error);
  });
