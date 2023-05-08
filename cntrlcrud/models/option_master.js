"use strict";
const { Model } = require("sequelize");
const select_master = require("./select_master");
module.exports = (sequelize, DataTypes) => {
  class option_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  option_master.init(
    {
      s_id: DataTypes.INTEGER,
      op_value: { type: DataTypes.STRING, defaultValue: "options" },
    },
    {
      sequelize,
      modelName: "option_master",
    }
  );
  option_master.associate = function (models) {
   let op_b= option_master.belongsTo(models.select_master, { foreignKey: "s_id",as:"sel_id" });
  };
  return option_master;
};
