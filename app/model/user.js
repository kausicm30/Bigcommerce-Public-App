let mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId : Number,
    email : String,
    accessToken : {type:Object},
    storeHash : String
});

module.exports = mongoose.model('User',userSchema,'userDetails');