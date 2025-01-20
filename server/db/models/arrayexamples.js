'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArrayExamples extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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