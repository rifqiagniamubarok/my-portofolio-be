'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Icon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Icon.init({
    name: DataTypes.STRING,
    about: DataTypes.TEXT,
    path: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Icon',
  });
  return Icon;
};