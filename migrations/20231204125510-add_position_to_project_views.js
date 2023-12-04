'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Project_Views', 'position', {
      type: Sequelize.INTEGER,
      allowNull: true, // Sesuaikan dengan kebutuhan
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Project_Views', 'position');
  },
};
