'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trips', [{
      tripDate: new Date(),
      rider: 'richard.hendricks',
      driver: 'erlich.bachman',
      createdAt: new Date(),
      updatedAt: new Date(),
      pickupDistance: 3.45,
      estimatedPickupTime: 12.21,
      pickupLocation_id: 1,
      dropDistance: 12.37,
      estimatedDropTime: 49.56,
      dropLocation_id: 1,
      tripFare: 32.67,
      fareCollected: false,
      tripStatus: 'Customer Requested'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Trips', null, {});
  }
};
