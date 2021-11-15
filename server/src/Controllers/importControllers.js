const GiangVien = require('../Models/importModels')
const importCtrl = {
    check : async(req,res) => {
        for (var key in req.body) {
            if(key>0){
                if (req.body.hasOwnProperty(key)) {
                    item = req.body[key];
                    const newGiangVien = new GiangVien({
                      hoten : item.__EMPTY,
                      magv : item.__EMPTY_2,
                      email : item.__EMPTY_4
                    })
                    await newGiangVien.save();
                  }
            }
        }
        res.status(200).json({msg:'imported'});
    }
}
module.exports = importCtrl