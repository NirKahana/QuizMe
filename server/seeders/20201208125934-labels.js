"use strict";
const labels = require("../data/labels");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Labels", labels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Labels", labels, {});
  },
};
