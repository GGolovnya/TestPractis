'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArrayExamples extends Model {
    static associate(models) {
      // define associations here
    }
  }
  
  ArrayExamples.init({
    name: DataTypes.STRING,
    arrayData: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'ArrayExamples',
  });
  
  return ArrayExamples;
};