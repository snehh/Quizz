const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth.js');

const User = require('../models/schema.js').User
require('../config/passport')(passport)



module.exports.postlogin = (req, res, next) => {
      passport.authenticate('local', function(err, user, info){
        if (err) { return next(err) }
        if (!user) {
          if(info.flag !== 0)
            return res.render('index', { name: '', usernamereg: '', usernamelog: req.body.username , errreg: '', errlog: info.message })
          else
          return res.render('index', { name: '', usernamereg: '', usernamelog: '' , errreg: '', errlog: info.message })
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.redirect(`user/${user.username}`)
        });
    })(req, res, next)
}

module.exports.postregister = (req, res) => {
  const { name, username, password, password2 } = req.body;
  var errreg = 0

  if(password !== password2)
    errreg = "Passwords do not match"

  if(errreg !== 0){
    
    res.render('index', {
      name, usernamereg: username, usernamelog: '', errreg, errlog: ''
    })
  }

  else{
    User.findOne({username: username})
    .then(user => {
      if(user){
        errreg = "username already registered"
        res.render('index', {
          name, usernamereg: username, usernamelog: '', errreg, errlog:''
        })
      }
      else{
        const currentDate = new Date().toDateString()
        const newUser = new User({
          name,
          username: username,
          password,
          date: currentDate
        })

        bcrypt.genSalt(10, (err, salt) => 
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err

            newUser.password = hash
            newUser.save()
              .then((user => {
                var errreg = "You have been registered. Please login now"
                res.render('index', {name: '', usernamereg:'', usernamelog: newUser.username, errreg, errlog:''}
                )
              }))
              .catch(err => console.log(err))
        }))
      }
    })
  }
}