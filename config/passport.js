const passport = require("passport")

const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/schema').User

module.exports = function(passport) {
    passport.use(
      
      new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        // Match user
        User.findOne({
          username: username
        }).then(user => {
          if (!user) {
            return done(null, false, { flag: 0, message: 'This username is not registered' })
          }
  
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { flag: 1, message: 'Password incorrect' })
            }
          })
        })
      })
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id)
      })
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user)
        })
      })
}  