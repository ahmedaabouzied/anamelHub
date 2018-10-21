'use strict';
module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', {
    title: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    symptoms: {
      type: DataTypes.TEXT
    },
    diagnosis: {
      type: DataTypes.TEXT
    },
    details: {
      type: DataTypes.TEXT
    },
    treatment: {
      type: DataTypes.TEXT
    },
    image_url: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: true
  });
  Case.associate = function (models) {
    // associations can be defined here
    Case.belongsTo(models.User, { as: 'user' });
    Case.hasMany(models.Star, { as: 'stars' });
    Case.belongsToMany(models.Tag, { through: 'CaseTag' })
  };
  return Case;
};