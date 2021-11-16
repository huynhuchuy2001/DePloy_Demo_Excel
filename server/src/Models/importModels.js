const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const giangvienSchema = new Schema({
    HoTen : String,
    MaVC : String,
    Email : String,
    MaKhoa : String
})
module.exports = mongoose.model('giangvien',giangvienSchema);