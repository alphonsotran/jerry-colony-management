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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
  Cage.associate = function (models) {
    Cage.belongsTo(models.User);
  };
  return Cage;
};
