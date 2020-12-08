'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Quiz, {
        foreignKey: 'quizId'
      });
      this.belongsTo(models.Label, {
        foreignKey: 'labelId'
      });
    }
  };
  QuizLabel.init({
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'QuizLabel',
  });
  return QuizLabel;
};