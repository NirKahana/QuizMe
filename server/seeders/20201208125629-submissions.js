'use strict';
const submissions = require("../data/submissions");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Submissions', submissions,{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Submissions', submissions, {});
  }
};
