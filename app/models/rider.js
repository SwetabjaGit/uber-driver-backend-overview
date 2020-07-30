'use strict';
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export default (sequelize, DataTypes) => {
  const Rider = sequelize.define('Rider', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Rider name is required.' }
      }
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: { msg: 'Email is required.' }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Rider.associate = function(models) {
  };
  return Rider;
};