'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Drivers', 
    [
      {
        userName: 'erlich.bachman',
        phoneNo: '2364712491',
        email: 'erlich.bachman@piedpiper.com',
        rating: 4.38,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'big.head',
        phoneNo: '7843756492',
        email: 'big.head@piedpiper.com',
        rating: 4.34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'jin.yang',
        phoneNo: '4329049230',
        email: 'jin.yang@piedpiper.com',
        rating: 4.34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'russ.hanneman',
        phoneNo: '8965848404',
        email: 'russ.hanneman@piedpiper.com',
        rating: 4.34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'monnica.p',
        phoneNo: '9328947233',
        email: 'monnica.p@piedpiper.com',
        rating: 4.34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'laurie.bream',
        phoneNo: '2893285932',
        email: 'laurie.bream@piedpiper.com',
        rating: 4.34,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drivers', null, {});
  }
};
