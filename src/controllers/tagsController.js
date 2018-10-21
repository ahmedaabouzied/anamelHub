const ControllerHelpers = require('./controllerHelpers');
const Tag = require('../models/index').Tag;

module.exports = {
    showAll(req,res){
        Tag.findAll({})
        .then((tags)=>{
            res.send(tags);
        })
    }
}