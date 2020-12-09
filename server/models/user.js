'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Submission, {
        foreignKey: 'userId'
      })
      this.belongsToMany(models.Quiz, {
        through: models.Submission,
        foreignKey: 'userId',
        otherKey: 'quizId'
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
  });
  return User;
};