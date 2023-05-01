"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkInsert(
      'comments', [{
        title:"comment title",
        commentableId:1,
        commentableType:"image",
 
      }], 
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete("comments", null, {});
  },
};
