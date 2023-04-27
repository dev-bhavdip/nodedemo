'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  petName.init({
    type: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'petName',
  });
  return petName;
};