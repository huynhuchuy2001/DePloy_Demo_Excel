const router = require('express').Router()
const monthiCtrl = require('../Controllers/monthiControllers')
router.route('/monthi')
    .post(monthiCtrl.check);
module.exports = router