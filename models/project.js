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
      // define association here
    }
  }
  Project.init(
    {
      user_id: DataTypes.INTEGER,
      thumbnail: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.TEXT,
      meta_description: DataTypes.TEXT,
      body: DataTypes.TEXT,
      scale: DataTypes.STRING,
      status: DataTypes.STRING,
      like: DataTypes.INTEGER,
      view: DataTypes.INTEGER,
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
