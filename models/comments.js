'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
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
  comments.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, 
  {
    sequelize,
    tableName: 'comments',
    modelName: 'comments',
  });
  return comments;
};