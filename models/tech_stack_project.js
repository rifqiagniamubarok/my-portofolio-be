'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tech_Stack_Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Tech_Stack_Project.belongsTo(models.Project, {
      //   foreignKey: 'project_id',
      // });
      // Tech_Stack_Project.belongsToMany(models.Tech_Stack_Icon, {
      //   foreignKey: 'tech_stack_id',
      // });
    }
  }
  Tech_Stack_Project.init(
    {
      project_id: DataTypes.INTEGER,
      tech_stack_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tech_Stack_Project',
    }
  );
  return Tech_Stack_Project;
};
