const MonThi = require('../Models/monthiModels')
const MonThiCtrl = {
    check : async(req,res) => {
        for (var key in req.body) {
            if(key>0){
                if (req.body.hasOwnProperty(key)) {
                    item = req.body[key];
                    const newMonThi = new MonThi({
                        MaHp : item.__EMPTY,
                        TenHp : item.__EMPTY_2,
                        NhomKT : item.__EMPTY_4,
                        HinhThucKT :item.__EMPTY_5,
                        GVGD : item.__EMPTY_7,
                        MaGV : item.__EMPTY_9,
                        HeDT : item.__EMPTY_11,
                        ChuongTrinh : item.__EMPTY_13,
                        DoViToChuc : item.__EMPTY_15,
                        ToKiem : item.__EMPTY_17,
                        SoLuong : item.__EMPTY_19
                    })
                    await newMonThi.save();
                  }
            }
        }
        res.status(200).json({msg:'imported'});
    }
}
module.exports = MonThiCtrl