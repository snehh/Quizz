const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

const { UserQuiz } = require('../models/schema.js')

router.get('/:tagname', ensureAuthenticated, (req, res) => {
    const user = req.user

    var tag = req.params.tagname
    UserQuiz.find({tags: tag}, function(err, quizarray){
        if(err) console.log(err)

        if(quizarray.length > 0){
            res.render('taglist', {check: 1, quizarray: quizarray.reverse(), tag})
        }
        else{
            res.render('taglist', {check: 0, tag})
        }
    })
})

module.exports = router;