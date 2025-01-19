'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArrayExamples extends Model {
    static associate(models) {
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