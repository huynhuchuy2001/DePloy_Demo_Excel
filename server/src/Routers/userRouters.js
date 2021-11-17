const router = require('express').Router()
const userCtrl = require('../Controllers/userControllers')
router.route('/user')
    .post(userCtrl.login)
module.exports = router
