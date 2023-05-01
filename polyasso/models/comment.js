"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init(
    {
      title: DataTypes.STRING,
      commentableId: DataTypes.INTEGER,
      commentableType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );

  comment.associate = function (models) {
    comment.belongsTo(models.videos, {
      foreignKey: "commentableId",
      constraints: false,
      as: "v_id",
    });
    comment.belongsTo(models.photos, {
      foreignKey: "commentableId",
      constraints: false,
      as: "img_id",
    });
  };
  // comment.associate = function (models) {

  // };

  return comment;
};
