'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.hasMany(models.Education_Experience, { foreignKey: 'education_id', as: 'experiences' });
    }
  }
  Education.init(
    {
      name: DataTypes.STRING,
      from: DataTypes.DATEONLY,
      to: DataTypes.DATEONLY,
      present: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Education',
      tableName: 'Educations',
    }
  );
  return Education;
};
