// models/animal.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
    }
  }
  
  Animal.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isEndangered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    habitat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    diet: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    characteristics: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  }, {
    sequelize,
    modelName: 'Animal',
  });
  
  return Animal;
};