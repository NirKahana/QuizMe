'use strict';
const quizLabels = require("../data/quizLables");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("QuizLabels", quizLabels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("QuizLabels", quizLabels, {});
  }
};
