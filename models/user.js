"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  try {
    User.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      // {
      //   hooks: {
      //     beforeCreate: (user, options) => {
      //       console.log("happy");
      //     },
      //     afterCreate: (user, options) => {
      //       console.log("happy mood");
      //     },
      //   },
      // },
      {
        sequelize,
        modelName: "User",
      }
    );
   
  } catch (err) {
    console.error(err);
  }

  return User;
};
