'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education_Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Education_Experience.init(
    {
      education_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Education_Experience',
    }
  );
  return Education_Experience;
};
