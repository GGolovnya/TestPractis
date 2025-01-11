const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.HuntingArea, {
        foreignKey: 'userId',
        as: 'huntingAreas'
      });
      User.hasMany(models.Route, {
        foreignKey: 'createdBy',
        as: 'routes'
      });
      User.hasMany(models.Animal, {
        foreignKey: 'createdBy',
        as: 'animals'
      });
      User.hasMany(models.Favorite, {
        foreignKey: 'userId',
        as: 'favorites'
      });
      User.hasMany(models.PasswordResetToken, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments'
      });
    }
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    indexes: [
      {
        fields: ['email']
      }
    ]
  });
  
  return User;
};