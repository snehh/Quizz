const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const accountviewControl = require('../controllers/accountview')

//Homepage
router.get('/:username', ensureAuthenticated, accountviewControl.homeview)
router.get('/:username/quizzes', ensureAuthenticated, accountviewControl.userlist)
router.get('/view/:username', ensureAuthenticated, accountviewControl.otherview)
router.get('/:username/myaccount', ensureAuthenticated, (req, res) => {
    var user = req.user

    res.render('viewacc', { user: req.user })
})


router.get('/', ensureAuthenticated, (req, res) => {
  const user = req.user

  res.redirect(`/user/${req.user.username}`)
})

module.exports = router;