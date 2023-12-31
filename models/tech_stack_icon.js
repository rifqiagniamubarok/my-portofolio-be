'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tech_Stack_Icon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tech_Stack_Icon.belongsToMany(models.Project, {
        through: 'Tech_Stack_Project',
        foreignKey: 'tech_stack_id',
      });
    }
  }
  Tech_Stack_Icon.init(
    {
      name: DataTypes.STRING,
      about: DataTypes.TEXT,
      icon_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Tech_Stack_Icon',
    }
  );
  return Tech_Stack_Icon;
};
