'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PickupLocations', 
    [
      {
        address: "3865 Middlefield Rd, Palo Alto, CA 94303",
        rider: "richard.hendricks",
        lat: 37.421512,
        lng: -122.110351,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "200-232 Santa Clara Ave, San Bruno, CA 94066",
        rider: "jared.dunn",
        lat: 65.896543,
        lng: 327.347856,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "1 Hacker Way, Menlo Park, CA 94025",
        rider: "dinesh.p",
        lat: 123.435625,
        lng: 45.543352,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
        rider: "gilfoyle.p",
        lat: 87.546872,
        lng: -436.870966,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "1665 Charleston Rd, Mountain View, CA 94043",
        rider: "gavin.belson",
        lat: 76.857290,
        lng: -87.992031,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "580 N Mary Ave, Sunnyvale, CA 94085",
        rider: "peter.gregory",       
        lat: 74.982596,
        lng: 73.235462,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PickupLocations', null, {});
  }
};
