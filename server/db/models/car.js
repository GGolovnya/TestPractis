// models/car.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
    }
  }
  
  Car.init({
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        engine: {
          type: null,
          volume: null,
          power: null,
          fuel: null
        },
        transmission: {
          type: null,
          gears: null
        },
        dimensions: {
          length: null,
          width: null,
          height: null
        },
        performance: {
          maxSpeed: null,
          acceleration: null
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  
  return Car;
};