'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArrayMethod extends Model {
    static associate(models) {
    }
  }
  
  ArrayMethod.init({
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inputData: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    expectedOutput: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ArrayMethod',
  });
  
  return ArrayMethod;
};