'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
      await queryInterface.bulkInsert('videos', [{
       title:"demo",
       text:"dmo text",
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
       await queryInterface.bulkDelete('videos', null, {});
     
  }
};
