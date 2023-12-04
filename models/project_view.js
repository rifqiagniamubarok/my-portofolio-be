'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_View extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project_View.init(
    {
      project_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      url: DataTypes.TEXT,
      is_publish: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Project_View',
    }
  );
  return Project_View;
};
