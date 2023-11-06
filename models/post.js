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
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Post.belongsToMany(models.Tag, {
        through: 'Tag_Post', // Nama model perantara
        foreignKey: 'post_id', // Nama kolom di model Tag_Post yang menghubungkan ke Post
        as: 'tags', // Alias yang digunakan untuk mengakses tags
      });
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
      is_publish: { type: DataTypes.BOOLEAN, defaultValue: false },
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
