'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      thumbnail: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.TEXT,
      },
      meta_description: {
        type: Sequelize.TEXT,
      },
      body: {
        type: Sequelize.TEXT,
      },
      scale: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      view: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  },
};
