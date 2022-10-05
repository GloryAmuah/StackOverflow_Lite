'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('answers', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      questionId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      answer: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      upvotes: { 
        type: DataTypes.INTEGER,
      },
      downvotes: { 
        type: DataTypes.INTEGER,
      },
      acceptedAnswer: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('answers');
  }
};
