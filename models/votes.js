'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ answers, User }) {
      this.belongsTo( answers, { foreignKey: 'answerId' }) 
      this.belongsTo( User, { foreignKey: 'userId' }) 
    }
  }
  votes.init(
  {
    upvotes: { 
      type: DataTypes.INTEGER,
    },
    downvotes: { 
      type: DataTypes.INTEGER,
    },
  }, 
  {
    sequelize,
    tableName: 'votes',
    modelName: 'votes'
  });
  return votes;
};