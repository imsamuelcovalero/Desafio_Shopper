'use strict';
// const { DatabaseImportService } = require('../../services/DatabaseImportService/DatabaseImportService');
const { DatabaseImportService } = require('../../../build/services/DatabaseImportService/DatabaseImportService');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const databaseImportService = new DatabaseImportService();
    await databaseImportService.importDataFromSqlFile();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('packs', null, {});
  }
};
