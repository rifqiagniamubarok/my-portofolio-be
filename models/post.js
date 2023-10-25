'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      user_id: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      title: DataTypes.STRING,
      slug: DataTypes.TEXT,
      meta_description: DataTypes.TEXT,
      body: DataTypes.TEXT,
      like: DataTypes.INTEGER,
      view: DataTypes.INTEGER,
      is_publish: DataTypes.BOOLEAN,
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
