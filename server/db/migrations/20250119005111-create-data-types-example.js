'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DataTypesExample', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      textField: {
        type: Sequelize.STRING
      },
      numberField: {
        type: Sequelize.INTEGER
      },
      decimalField: {
        type: Sequelize.DECIMAL(10, 2)
      },
      booleanField: {
        type: Sequelize.BOOLEAN
      },
      dateField: {
        type: Sequelize.DATE
      },
      jsonField: {
        type: Sequelize.JSON
      },
      arrayField: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      enumField: {
        type: Sequelize.ENUM('option1', 'option2', 'option3')
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
    await queryInterface.dropTable('DataTypesExample');
  }
};