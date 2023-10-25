'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          name: 'Rifqi Agnia Mubarok',
          about:
            'As a passionate full-stack developer, I am comfortable in using tech stacks like ReactJS, NextJS, ExpressJS, TypeScript, and MySQL to build powerful web applications. Although I am more comfortable with front-end development, I am open to taking on back-end development responsibilities or even both, as needed. Additionally, I possess problem-solving and teamwork skills, excellent communication abilities, and a strong passion for continuously learning new technologies. I am excited to bring these skills and experience to your team and make valuable contributions to your projects',
          picture: null,
          resume: null,
          open_to_work: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
