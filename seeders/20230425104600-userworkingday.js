'use strict';

const { NOW } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert('WorkingDays', [{
        weekDay:'Monday',
        workingDate:new Date(),
        isWorking:0
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
      await queryInterface.bulkDelete('WorkingDays', null, {});
     
  }
};
