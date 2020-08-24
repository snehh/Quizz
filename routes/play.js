const express = require('express');
const router = express.Router();

const { User, UserQuiz, LiveActive} = require('../models/schema.js');
const { ensureAuthenticated } = require('../config/auth.js');

router.get('/:gameid', ensureAuthenticated, (req, res) => {
    var user = req.user

    UserQuiz.findOne({_id: req.params.gameid})
        .then(quiz => {
            if(quiz){
                if(quiz.createdBy === req.user.username){
                    res.redirect(`/quizzes/myquiz/${quiz._id}`)
                }
                else{
                    res.render('usergameplay', { quizz: quiz })
                }
            }
            else{
                res.redirect('/error')
            }
        })
        .catch(err => console.log(err))
})

router.get('/myquiz/:quizid', ensureAuthenticated, (req, res) => {
    var user = req.user;

    UserQuiz.findOne({_id: req.params.quizid})
        .then(quiz => {
            if(quiz.createdBy === req.user.username){
                res.render('myquizview', {quiz: quiz, correct: "correct"})
            }
            else{
                res.redirect(`/quizzes/${quiz._id}`)
            }
        })
        .catch(err => console.log(err))
})

router.get('/myquiz/:quizid/edit', ensureAuthenticated, (req, res) => {
    var user = req.user;

    UserQuiz.findOne({_id: req.params.quizid})
        .then(quiz => {
            if(quiz.createdBy === req.user.username){
                res.render('editmyquiz', {quiz: quiz})
            }
            else{
                res.redirect(`/quizzes/${quiz._id}`)
            }
        })
        .catch(err => console.log(err))
})

router.get('/myquiz/:quizid/liveactive', ensureAuthenticated, (req, res) => {
    var user = req.user;
    LiveActive.findOne({quizId: req.params.quizid})
        .then(active => {
            if(active){
                res.redirect('/live')
            }else{
                UserQuiz.findOne({_id: req.params.quizid})
                .then(quiz => {
                    if(quiz.createdBy === req.user.username){
                        res.render('liveform', {quiz})
                    }
                    else{
                        res.redirect(`/quizzes/${quiz._id}`)
                    }
                })
                .catch(err => console.log(err))
            }
        })


})

router.get('/myquiz/:quizid/delete', ensureAuthenticated, (req, res) => {
    var user = req.user;

    UserQuiz.findOneAndDelete({_id: req.params.quizid, createdBy: user.username})
        .then(() => {   
            User.findOne({username: user.username})
                .then(user => {
                    user.quizno = user.quizno - 1
                    user.save()
                        .then(() => {
                            res.redirect(`/user/${user.username}/quizzes`)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))                   
        })
        .catch(err => console.log(err))
})

router.post('/:gameid/results', (req, res) => {
    UserQuiz.findOne({_id: req.params.gameid})
        .then(quiz => {
            var ansarray = [];
            var length = req.body.length
            
            for(var i=0; i<length; i++){
                if(req.body[i]){
                    var x = parseInt(req.body[i])
                    x %= 10
                    ansarray.push(x)
                }    
                else{
                    var x = -1
                    ansarray.push(x)
                }
            }
            var gamecorrect=0, gamewrong=0; 
            for(var j=0; j<length; j++){
                if(parseInt(quiz.questions[j].correct) === ansarray[j])
                    gamecorrect++
                else{
                    gamewrong++
                }
            }
            var user = req.user;
            user.correct += gamecorrect;
            user.wrong += gamewrong;
            user.save()
                .then(user => {
                    var usq = [], adq = []
                    var flag = 1;
                    usq = {
                        quiz: quiz,
                        flag
                    }
           
                    var flag = 0;
                    adq.push(flag)
                    
                    res.render('results', {gamecorrect, gamewrong, usq, adq})
                })
                .catch(err => console.log(err))
        })
})


module.exports = router