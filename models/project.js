'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.Project_View, {
        foreignKey: 'project_id',
      });
      Project.belongsToMany(models.Tech_Stack_Icon, {
        through: 'Tech_Stack_Project',
        foreignKey: 'project_id',
      });
    }
  }
  Project.init(
    {
      user_id: { type: DataTypes.INTEGER, defaultValue: 1 },
      thumbnail: DataTypes.TEXT,
      title: DataTypes.STRING,
      slug: DataTypes.TEXT,
      meta_description: DataTypes.TEXT,
      body: DataTypes.TEXT,
      scale: DataTypes.STRING,
      status: DataTypes.STRING,
      like: { type: DataTypes.INTEGER, defaultValue: 0 },
      view: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_publish: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
