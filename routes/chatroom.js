const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const socketio = require('socket.io')
const moment = require('moment')

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Homepage
router.get('/', ensureAuthenticated, (req, res) => {
    currentUser = req.user.name
    const user = req.user
    res.render('chatroom', {name: req.user.username});
  } )

function format(username, text) {
  return {username, text, time:moment().format('h:mm:a')}
}

module.exports.router = router;

module.exports.connect = function(io) {

  var userarray = [];

  io.on('connection', socket => {

    socket.on('userconnect', (username) => {
        var id=socket.id

        userarray.push({username, id})

        io.emit('activejoin', {username, id, userarray})
        socket.emit('welcome')
        socket.broadcast.emit('userjoin', {username, id, userarray} )

        socket.on('disconnect', () => {
          
          for(var i=0; i<userarray.length; i++) {
            if(userarray[i].id === id){
              userarray.splice(i,1);
              break;
            }
          }
          io.emit('userleave', {username, id, userarray})
        })
    })
    

    socket.on('chat', (v) => {
      const message = v.msg;
      socket.emit('my-message', format("You", message))
      socket.broadcast.emit('chat-message', format(v.user, message))
    })
  })
}