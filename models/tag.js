'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Post, {
        through: 'Tag_Post', // Nama model perantara
        foreignKey: 'tag_id', // Nama kolom di model Tag_Post yang menghubungkan ke Tag
        as: 'posts', // Alias yang digunakan untuk mengakses posts
      });
    }
  }
  Tag.init(
    {
      name: { type: DataTypes.STRING, unique: true },
      about: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};
