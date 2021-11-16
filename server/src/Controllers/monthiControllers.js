const MonThi = require('../Models/monthiModels')
const MonThiCtrl = {
    check : async(req,res) => {
        for (var key in req.body) {
            if(key>0){
                if (req.body.hasOwnProperty(key)) {
                    item = req.body[key];
                    const newMonThi = new MonThi({
                        MaHp : item.__EMPTY,
                        TenHp : item.__EMPTY_1,
                        NhomKT : item.__EMPTY_2,
                        HinhThucKT :item.__EMPTY_3,
                        GVGD : item.__EMPTY_4,
                        MaGV : item.__EMPTY_5,
                        HeDT : item.__EMPTY_6,
                        ChuongTrinh : item.__EMPTY_7,
                        DoViToChuc : item.__EMPTY_8,
                        ToKiem : item.__EMPTY_9,
                        SoLuong : item.__EMPTY_10,
                        MaKhoa : item.__EMPTY_11
                    })
                    await newMonThi.save();
                  }
            }
        }
        res.status(200).json({msg:'imported'});
    }
}
module.exports = MonThiCtrl