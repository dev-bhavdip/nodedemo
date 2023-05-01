"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class videos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  videos.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "videos",
    }
  );
  videos.associate = function (models) {
    videos.hasMany(models.comment, {
      foreignKey: "commentableId",
      constraints: false,
      as: "v_id",
      scope: {
        commentableType: "video",
      },
    });
  };
  return videos;
};
