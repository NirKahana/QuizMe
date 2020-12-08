"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Submission, {
        foreignKey: "quizId",
      });
      this.hasMany(models.QuizLabel, {
        foreignKey: "quizId",
      });
      this.hasMany(models.Question, {
        foreignKey: "quizId",
      });
    }
  }
  Quiz.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      underscored: true,
      modelName: "Quiz",
    }
  );
  return Quiz;
};
