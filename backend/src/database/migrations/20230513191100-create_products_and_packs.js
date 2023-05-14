'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      code: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      costPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'cost_price',
      },
      salesPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'sales_price',
      },
    });

    await queryInterface.createTable('packs', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      packId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'pack_id',
        references: {
          model: 'products',
          key: 'code',
        },
      },
      productId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'code',
        },
      },
      qty: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('packs');
    await queryInterface.dropTable('products');
  }
};