'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Riders', 
    [
      {
        userName: 'richard.hendricks',
        phoneNo: '6329352038',
        email: 'richard.hendricks@piedpiper.com',
        rating: 4.72,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'jared.dunn',
        phoneNo: '7643562390',
        email: "jared.dunn@piedpiper.com",
        rating: 4.25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'dinesh.p',
        phoneNo: '2385327043',
        email: 'dinesh.p@piedpiper.com',
        rating: 4.25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'gilfoyle.p',
        phoneNo: '9547869034',
        email: 'gilfoyle.p@piedpiper.com',
        rating: 4.25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'gavin.belson',
        phoneNo: '6346547364',
        email: 'gavin.belson@piedpiper.com',
        rating: 4.25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'peter.gregory',
        phoneNo: '8723562356',
        email: 'peter.gregory@piedpiper.com',
        rating: 4.25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Riders', null, {});
  }
};
