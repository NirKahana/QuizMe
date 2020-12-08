'use strict';
const fields = require("../data/fields");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Fields", fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Fields", fields, {});
  }
};
