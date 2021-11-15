const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MonThiSchema = new Schema({
    MaHp : String,
    TenHp : String,
    NhomKT : String,
    HinhThucKT :String,
    GVGD : String,
    MaGV : String,
    HeDT : String,
    ChuongTrinh : String,
    DoViToChuc : String,
    ToKiem : String,
    SoLuong : Number
})
module.exports = mongoose.model('monthi',MonThiSchema);