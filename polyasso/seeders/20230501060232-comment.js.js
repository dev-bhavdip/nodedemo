'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
     await queryInterface.bulkInsert(
     "photos",
      [
        {
          title: "image title",
          url: "url col",
        },
      ],{});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
      await queryInterface.bulkDelete('photos', null, {});
    
  }
};
