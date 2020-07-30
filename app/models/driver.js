'use strict';
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export default (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Driver name is required.' }
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
  Driver.associate = function(models) {
  };
  return Driver;
};