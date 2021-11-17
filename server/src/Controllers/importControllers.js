const GiangVien = require('../Models/importModels')
const importCtrl = {
    check : async(req,res) => {
        for (var key in req.body) {
            if(key>0){
                if (req.body.hasOwnProperty(key)) {
                    item = req.body[key];
                    const newGiangVien = new GiangVien({
                        HoTen : item.__EMPTY,
                        MaVC : item.__EMPTY_1,
                        Email : item.__EMPTY_2,
                        // MaKhoa : item.__EMPTY_3
                    })
                    await newGiangVien.save();
                  }
            }
        }
        res.status(200).json({msg:'imported'});
    }
}
module.exports = importCtrl