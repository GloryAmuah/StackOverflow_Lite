'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('comments', {
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
      body: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        allowNull: false,
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
    await queryInterface.dropTable('comments');
  }
};