'use strict';

export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    tripDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Driver',
        key: 'userName'
      }
    },
    rider: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Rider',
        key: 'userName'
      }
    },
    tripStatus: {
      type: DataTypes.ENUM('Customer Requested', 'Driver Rejected', 'Driver Accepted', 'Trip Started', 'Trip Completed'),
      defaultValue: 'Customer Requested'
    },
    pickupLocation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PickupLocation',
        key: 'id'
      }
    },
    pickupDistance: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
    estimatedPickupTime: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
    dropLocation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DropLocation',
        key: 'id'
      }
    },
    dropDistance: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
    estimatedDropTime: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
    tripFare: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
    fareCollected: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {});
  Trip.associate = function(models) {
  };
  return Trip;
};