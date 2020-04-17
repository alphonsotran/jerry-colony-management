'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cage = sequelize.define(
    'Cage',
    {
      genotype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cageNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  Cage.associate = function (models) {
    // associations can be defined here
  };
  return Cage;
};