const User = require('../Models/userModels');
const userCtrl = {
    login : async(req,res) =>{
        const user = await User.findOne({ID : {$eq:req.body.ID}})
        if(user){
            return res.status(400).json({msg : "Email exist!"});
        }
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            fullName : req.body.fullName,
            email : req.body.email,
            ID : req.body.ID,
            image : req.body.image,
            accessToken : req.body.accessToken,
            token_ID : req.body.token_ID,
            Api : req.body.Api
        });
        await newUser.save();
        res.status(200).json({msg:"Login Success!"})
    }
};
module.exports = userCtrl
