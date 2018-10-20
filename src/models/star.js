'use strict';
module.exports = (sequelize, DataTypes) => {
  const Star = sequelize.define('Star', {
    caseId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Star.associate = function (models) {
    // associations can be defined here

  };
  return Star;
};