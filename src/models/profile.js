'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    first_name: {
      type:  DataTypes.STRING,
    },
    last_name: {
      type:  DataTypes.STRING,
    },
    gender: {
      type:  DataTypes.STRING
    },
    country: {
      type:  DataTypes.STRING,
    },
    date_of_birth: {
      type:  DataTypes.STRING,
    },
    city: {
      type:  DataTypes.STRING,
    },
    education: {
      type:  DataTypes.STRING,
    },
    university_name: {
      type:  DataTypes.STRING,
    },
    profile_image_url: {
      type:  DataTypes.STRING,
    },
    cover_image_url: {
      type:  DataTypes.STRING,
    },
    bio: {
      type:  DataTypes.TEXT,
    },
  }, {});
  Profile.associate = function (models) {
    // associations can be defined here
    // Profile has one User
    Profile.belongsTo(models.User);
  };
  return Profile;
};