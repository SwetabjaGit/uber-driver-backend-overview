'use strict';
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export default (sequelize, DataTypes) => {
  const DropLocation = sequelize.define('DropLocation', {
    rider: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Rider',
        key: 'userName'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: function () { return this.isAvailable === true }
    },
  }, {});
  DropLocation.associate = function(models) {
  };
  return DropLocation;
};