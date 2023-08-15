const { QueryInterface, DataTypes, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });

    // Add initial data
    await queryInterface.bulkInsert('products', [
      {
        productName: 'A',
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'B',
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'C',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'D',
        price: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
