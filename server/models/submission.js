'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Quiz, {
        foreignKey: 'quizId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  };
  Submission.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Submission',
  });
  return Submission;
};