'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ObjectExamples extends Model {
    static associate(models) {
    }
  }
  
  ObjectExamples.init({
    name: DataTypes.STRING,
    objectData: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'ObjectExamples',
  });
  
  return ObjectExamples;
};