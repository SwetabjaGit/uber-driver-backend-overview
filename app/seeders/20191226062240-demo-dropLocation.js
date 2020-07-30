'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DropLocations', 
    [
      {
        address: "1 Hacker Way, Menlo Park, CA 94025",
        rider: "richard.hendricks",
        lat: 37.48287,
        lng: -122.150264,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
        rider: "jared.dunn",
        lat: 37.421845,
        lng: -122.084079,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "L-22, Stanford, CA 94305",
        rider: "dinesh.p",
        lat: 56.482870,
        lng: 45.150264,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "128-198 Park Ave, Palo Alto, CA 94306",
        rider: "gilfoyle.p",
        lat: 34.482870,
        lng: -325.150264,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "2348-2394 Glen Way, East Palo Alto, CA 94303",
        rider: "gavin.belson",
        lat: -65.482870,
        lng: 76.150264,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: "1920-1938 Pulgas Ave, East Palo Alto, CA 94303",
        rider: "peter.gregory",
        lat: -133.482870,
        lng: 97.150264,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DropLocations', null, {});
  }
};
