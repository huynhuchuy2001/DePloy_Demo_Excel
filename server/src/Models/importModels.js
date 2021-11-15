const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const giangvienSchema = new Schema({
    HoTen : String,
    MaGV : String,
    Email : String
})
module.exports = mongoose.model('giangvien',giangvienSchema);