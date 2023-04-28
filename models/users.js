"use strict";
const { Model } = require("sequelize");
const WorkingDay = Model.WorkingDay;
const Company = Model.Company;

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
 const user= Users.init(
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          console.log("happy");
        },
        afterCreate: (user, options) => {
          console.log("more happy");
        },
        afterValidate: (instance, options) => {
          console.log("after validate");
        },
        beforeValidate: (instance, options) => {
          console.log("before validate");
        },
        beforeUpdate: (instance, options) => {
          console.log("this is before update ");
        },
        afterUpdate: (instance, options) => {
          console.log("this is after update");
        },
      },
    
      sequelize,
      modelName: "Users",
    }
  );
  

  Users.associate = function (models) {
   
    Users.belongsTo(models.Company, { foreignKey: "companyId", as: "company" });
    Users.addScope('defaultScope',{limit: 2})

  };
  Users.associate = function (models) {
    // Users.addScope('defaultScope',{limit: 2})

    Users.belongsToMany(models.WorkingDay, {
      through: "UsersWorkingDays",
      foreignKey: "userId",
      as: "days",
    });
    Users.belongsTo(models.Company, { foreignKey: "companyId", as: "company" });

  };

  user.scope().findAll().then((aa)=>
  {
    console.log("get data from scope in User js");
  }).catch((err)=>{
    console.log("error get in user js from scope");
  })
  return Users,user;
};
