'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DataTypesExample extends Model {
    static associate(models) {
    }
  }
  
  DataTypesExample.init({
    textField: DataTypes.STRING,
    numberField: DataTypes.INTEGER,
    decimalField: DataTypes.DECIMAL(10, 2),
    booleanField: DataTypes.BOOLEAN,
    dateField: DataTypes.DATE,
    jsonField: DataTypes.JSON,
    arrayField: DataTypes.ARRAY(DataTypes.STRING),
    enumField: DataTypes.ENUM('option1', 'option2', 'option3')
  }, {
    sequelize,
    modelName: 'DataTypesExample',
  });
  
  return DataTypesExample;
};