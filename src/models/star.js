module.exports = (sequelize,type)=>{
    var Star = sequelize.define("star",{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        }
    });
    return Star;
}