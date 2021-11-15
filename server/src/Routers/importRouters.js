const router = require('express').Router()
const importCtrl = require('../Controllers/importControllers')
router.route('/giangvien')
    .post(importCtrl.check);
module.exports = router