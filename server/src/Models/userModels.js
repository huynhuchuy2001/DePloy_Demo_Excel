const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName : String,
    lastName : String,
    fullName : String,
    email : {
        type : String,
        required : true,
        unique : true
    },
    Google_ID : String,
    image : String,
    accessToken : String,
    token_ID : String
})
module.exports = mongoose.model('user',userSchema);