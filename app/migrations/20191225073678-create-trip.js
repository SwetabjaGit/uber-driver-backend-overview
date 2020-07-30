'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      driver: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Drivers',
          key: 'userName'
        }
      },
      rider: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Riders',
          key: 'userName'
        }
      },
      tripStatus: {
        type: Sequelize.ENUM('Customer Requested', 'Driver Rejected', 'Driver Accepted', 'Trip Started', 'Trip Completed'),
        defaultValue: 'Customer Requested'
      },
      pickupLocation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'PickupLocations',
          key: 'id'
        }
      },
      pickupDistance: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      estimatedPickupTime: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      dropLocation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'DropLocations',
          key: 'id'
        }
      },
      dropDistance: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      estimatedDropTime: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      tripFare: {
        type: Sequelize.DOUBLE,
        allowNull: function () { return this.isAvailable === true }
      },
      fareCollected: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};
