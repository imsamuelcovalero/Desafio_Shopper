'use strict';
// importa o arquivo database.json da pasta src/database
const database = require('../database.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Produtos', database.products);
    console.log('Pacotes', database.packs);
    // cria os produtos
    await queryInterface.bulkInsert('products', database.products, {});
    // cria os pacotes
    await queryInterface.bulkInsert('packs', database.packs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('packs', null, {});
  }
};
