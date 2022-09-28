'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ questions, User }) {
      
      this.belongsTo( questions, { foreignKey: 'questionId' }) 
      this.belongsTo( User, { foreignKey: 'userId' }) 

    }
  }
  answers.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    upvotes: { 
      type: DataTypes.INTEGER,
    },
    downvotes: { 
      type: DataTypes.INTEGER,
    },
    
  }, 
  {
    sequelize,
    tableName: 'answers',
    modelName: 'answers',
  });
  return answers;
};