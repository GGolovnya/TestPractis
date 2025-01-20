'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArrayMethods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inputData: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      expectedOutput: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ArrayMethods');
  }
};