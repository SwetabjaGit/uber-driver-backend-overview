'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DropLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rider: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Riders',
          key: 'userName'
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      lng: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DropLocations');
  }
};