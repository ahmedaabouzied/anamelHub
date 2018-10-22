'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));


/**
 * hashPassword function , 
 * @param user 
 * @param options 
 */
function hashPassword(user, options) {
  const SALT_FACTOR = 12;
  if (!user.changed('password')) {
    return;
  }
  return bcrypt
    .genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
  },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        //beforeSave:hashPassword
      }
    });
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  User.associate = function (models) {
    // associations can be defined here
    // User has one Profile
    User.hasOne(models.Profile);
    User.hasMany(models.Case, { as: "cases" });
    User.hasMany(models.Star, { as: "stars" });
    User.hasMany(models.Follower , {as:"followers"})
  };
  return User;
};