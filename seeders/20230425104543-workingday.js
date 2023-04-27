'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *  */
      await queryInterface.bulkInsert('UsersWorkingDays', [{
        userid:1,
        workingDayid:1
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */
     await queryInterface.bulkDelete('UsersWorkingDays', null, {});
     
  }
};
