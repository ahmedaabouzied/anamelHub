module.exports = (sequelize,type)=>{
    var Case = sequelize.define("case",{
        id:{
            type :type.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        title:{
            type:type.STRING,
        },
        gender:{
            type:type.STRING
        },
        age:{
            type:type.INTEGER
        },
        symptoms:{
            type:type.TEXT
        },
        diagnosis:{
            type:type.TEXT
        },
        details:{
            type:type.TEXT
        },
        treatment:{
            type:type.TEXT
        },
        image_url:{
            type:type.STRING
        },
    });
    return Case;
}