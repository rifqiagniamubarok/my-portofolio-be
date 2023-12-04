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
      Project_View.belongsTo(models.Project, {
        foreignKey: 'project_id',
      });
    }
  }
  Project_View.init(
    {
      project_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      url: DataTypes.TEXT,
      position: DataTypes.INTEGER,
      is_publish: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Project_View',
    }
  );
  return Project_View;
};
