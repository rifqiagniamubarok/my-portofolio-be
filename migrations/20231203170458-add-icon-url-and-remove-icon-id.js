'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tambahkan kolom "icon_url" dengan tipe teks
    await queryInterface.addColumn('Tech_Stack_Icons', 'icon_url', {
      type: Sequelize.TEXT,
      allowNull: true, // atau false, tergantung kebutuhan Anda
    });

    // Hapus kolom "icon_id"
    await queryInterface.removeColumn('Tech_Stack_Icons', 'icon_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Jika diperlukan, tambahkan kembali kolom "icon_id"
    await queryInterface.addColumn('Tech_Stack_Icons', 'icon_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // atau false, tergantung kebutuhan Anda
    });

    // Hapus kolom "icon_url"
    await queryInterface.removeColumn('Tech_Stack_Icons', 'icon_url');
  },
};
