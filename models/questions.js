'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {


      this.belongsTo(User, { foreignKey: 'userId' })

    }
  }
  questions.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    question: { 
      allowNull: false,
      type: DataTypes.STRING
    },
  }, 
  {
    sequelize,
    tableName: 'questions',
    modelName: 'questions',
  });
  return questions;
};