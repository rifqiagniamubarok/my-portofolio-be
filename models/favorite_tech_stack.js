'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_Tech_Stack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite_Tech_Stack.init({
    tech_stack_icon: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite_Tech_Stack',
  });
  return Favorite_Tech_Stack;
};