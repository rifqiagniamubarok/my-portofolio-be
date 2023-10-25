'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Social_Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Social_Media.init({
    icon_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Social_Media',
  });
  return Social_Media;
};