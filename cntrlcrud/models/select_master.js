"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class select_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  select_master.init(
    {
      type: DataTypes.STRING,
      multiallow: DataTypes.BOOLEAN,
      ctrl_key: { type: DataTypes.STRING, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "select_master",
    }
  );

  select_master.associate = function (models) {
   let sel_has= select_master.hasMany(models.option_master, { as: "select_id" });
  };
  return select_master;
};
