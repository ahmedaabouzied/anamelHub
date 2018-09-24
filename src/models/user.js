const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

/**
 * hashPassword function , 
 * @param user 
 * @param options 
 */
function hashPassword (user,options){
	const SALT_FACTOR = 12;
	if(!user.changed('password')){
		return;
	}
	return bcrypt
		.genSalt(SALT_FACTOR)
		.then(salt => bcrypt.hash(user.password,salt,null))
		.then(hash =>{
			user.setDataValue('password',hash)
		})
}
module.exports = (sequelize,type) =>{
	var User =  sequelize.define("user", {
		id:{
			type:type.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		email: {
			type:type.STRING,
			unique: true
		},
		password:{
			type:type.STRING
		}
	} ,{
		hooks:{
			beforeCreate:hashPassword,
			beforeUpdate:hashPassword,
			//beforeSave:hashPassword
		}
	}
);
	User.prototype.comparePassword = function (password){
		return bcrypt.compareAsync(password, this.password)
	}
	return User;
};