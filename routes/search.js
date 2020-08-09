const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

const { User, UserQuiz, Tags } = require('../models/schema.js')

router.get('/', ensureAuthenticated, (req, res) => {
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        if(req.query.type === 'tags'){
            res.redirect(`/tag/${req.query.search}`)
        }
        if(req.query.type === 'user'){
            User.find({$or:[{name: regex},{username:regex}]}, function(err, allUser){
                if(err) console.log(err)
                var check = { tags: 0, user: 1, quiz: 0 }
                res.render('searchhome', {check, allUser: allUser.reverse(), searchedFor: req.query.search })
            })
        }
        if(req.query.type === 'quiz'){
            UserQuiz.find({title: regex}, function(err, allQuiz){
                if(err) console.log(err)
                var check = { tags: 0, user: 0, quiz: 1 }
                res.render('searchhome', {check, allQuiz: allQuiz.reverse(), searchedFor: req.query.search })
            })
        }
    }
    else{
        var check = { tags: 0, user: 0, quiz: 0 }
        res.render('searchhome', {check})
    }
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;