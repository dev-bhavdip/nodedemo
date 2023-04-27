"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersWorkingDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersWorkingDay.init(
    {
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersWorkingDay",
    }
  );
  UsersWorkingDay.associate = function (models) {
    UsersWorkingDay.belongsTo(models.Users, { foreignKey: "userId" });
    UsersWorkingDay.belongsTo(models.WorkingDay, {
      foreignKey: "workingDayId",
    });
  };
  return UsersWorkingDay;
};
