const Sequelize = require("sequelize");
const chalk = require("chalk");
const UserModel = require('./user');
const ProfileModel = require('./profile');

// initialize sequelize
const sequelize = new Sequelize(
	'enamel_hub_local',
	'usr',
	'',
	{
		dialect: 'mysql',
		pool : {
			max: 5,
			min: 0,
			idle: 10000
		},
	}
);

// define models
const User = UserModel(sequelize,Sequelize);
const Profile = ProfileModel(sequelize,Sequelize);

// define relations 
Profile.belongsTo(User);
// sync models with database
sequelize.sync({force: true})
    .then(function(){
        console.log(chalk.blue("Database and tables created !!"));
    })
    .catch((error)=>{
        console.log("Error" +error)
        throw error;
    })

// export models
module.exports={
	User,
	Profile
}