module.exports = (sequelize,type) =>{
	var Profile =  sequelize.define("profile", {
		id:{
			type:type.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		first_name: {
			type:type.STRING,
        },
        last_name: {
            type:type.STRING,
        },
        gender:{
            type:type.STRING
        },
        coutry:{
            type: type.STRING,
        },
        date_of_birth:{
            type:type.STRING,
        },
        city:{
            type: type.STRING,
        },
        education:{
            type:type.STRING,
        },
        university_name: {
            type:type.STRING,
        },
        profile_image_url:{
            type:type.STRING,
        },
        cover_image_url:{
            type:type.STRING,
        },
        bio:{
            type:type.TEXT,
        },
    });
	return Profile;
};