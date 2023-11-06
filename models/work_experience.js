'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work_Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Work_Experience.belongsTo(models.Work, { foreignKey: 'work_id' });
    }
  }
  Work_Experience.init(
    {
      work_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Work_Experience',
    }
  );
  return Work_Experience;
};
