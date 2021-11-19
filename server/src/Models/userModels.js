const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName : String,
    lastName : String,
    fullName : String,
    email : {
        type : String,
        unique : true
    },
    ID : String,
    image : String,
    accessToken : String,
    token_ID : String,
    Api : String
})
module.exports = mongoose.model('user',userSchema);