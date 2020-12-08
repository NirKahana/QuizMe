'use strict';
const questions = require("../data/questions");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Questions", questions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Questions", questions, {});
  }
};
