const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../models/schema.js').User
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

require('../config/passport')(passport)

const userControl = require('../controllers/user')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index', {
  name: '', usernamereg: '', usernamelog: '', errreg: '', errlog: ''
}));


router.get('/register', forwardAuthenticated, (req, res) => res.redirect('/'))
router.get('/login', forwardAuthenticated, (req, res) => res.redirect('/'))
router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout;
    req.session.destroy(function (err) {
      res.redirect('/');
    })
})

// router.get('/logout', ensureAuthenticated, (req, res) => {
//   router.get('/logout', (req, res) => {
//     req.logout;
//     req.session.destroy(function (err) {
//         res.redirect('login');
//     })
// })
// })


router.post('/register', userControl.postregister)
router.post('/login', userControl.postlogin);

module.exports = router;