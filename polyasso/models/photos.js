"use strict";
const { Model } = require("sequelize");
const videos=require('./videos');
// const videos=model.videos;
module.exports = (sequelize, DataTypes) => {
  class photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  photos.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "photos",
    }
  );
  videos.associate = function (models) {
    photos.hasMany(models.comment, {
      foreignKey: "commentableId",
      constraints: false,
      as: "img_id",
      scope: {
        commentableType: "image",
      },
    });
  };
  return photos;
};
