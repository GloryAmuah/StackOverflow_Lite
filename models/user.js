'use strict';
const { Model } = require('sequelize');
const answers = require('./answers');
const votes = require('./votes');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ questions, answers, comments, votes }) {
      this.hasMany (questions, { foreignKey: 'userId', as: 'questions' })
      this.hasMany (answers, { foreignKey: 'userId', as: 'answers' })
      this.hasMany (comments, { foreignKey: 'userId', as: 'comments' })
      this.hasMany (votes, { foreignKey: 'userId', as: 'votes' })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }

  }
  User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : { msg: 'User must have an email' },
        notEmpty: { msg: 'Email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};