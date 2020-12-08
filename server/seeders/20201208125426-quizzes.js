"use strict";
const quizzes = require("../data/quizzes");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Quizzes", quizzes, {});},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Quizzes", quizzes, {});
  },
};
