'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }
  
  Product.init({
    productId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        images: [],
        videos: [],
        description: {
          short: "",
          detailed: "",
          features: []
        },
        price: {
          current: 0,
          old: null,
          currency: "RUB",
          installment: {
            available: false,
            monthlyPayment: 0,
            terms: 0
          }
        },
        specifications: {
          display: {},
          sound: {},
          connectivity: {}
        },
        availability: {
          status: "out_of_stock",
          quantity: 0,
          deliveryOptions: []
        },
        ratings: {
          average: 0,
          count: 0,
          distribution: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          topReviews: []
        },
        options: [],
        metadata: {
          createdAt: null,
          updatedAt: null,
          categories: [],
          tags: [],
          warranty: {
            months: 0,
            type: "",
            extendable: false
          },
          manufacturer: {
            name: "",
            country: "",
            support: {
              phone: "",
              email: "",
              hours: ""
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  
  return Product;
};