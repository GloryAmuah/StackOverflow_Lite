'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      upvotes: {
        type: DataTypes.INTEGER
      },
      downvotes: {
        type: DataTypes.INTEGER
      },
      answerId: {
        allowNull: false,
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('votes');
  }
};