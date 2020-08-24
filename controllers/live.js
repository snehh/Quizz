const { LiveActive, UserQuiz } = require('../models/schema')


module.exports.livehome = (req, res) => {

    LiveActive.find({})
    .then(activeArray => {
        if(activeArray.length > 0){
            var myActive = [], otherActive = [], attemptedActive = []
            for(var i=0; i<activeArray.length; i++){
                for(var j=0; j<activeArray[i].attempted.length; j++){
                    var isActive = 0
                    if(activeArray[i].attempted[j].username === req.user.username){
                        isActive = 1
                        break
                    }
                }
                if(isActive === 1) attemptedActive.push(activeArray[i])
                else if(activeArray[i].createdBy === req.user.username) myActive.push(activeArray[i])
                else otherActive.push(activeArray[i])
            }
            res.render('live', {myActive, otherActive, attemptedActive})
        }
    })
}

module.exports.liverules = (req, res) => {
    
    LiveActive.findOne({quizId: req.params.quizid})
        .then(quiz => {
            if(quiz){
                var flag = 0
                quiz.attempted.forEach(attempt => {
                    if(attempt.username === req.user.username){
                        flag = 1
                    }
                })
                if(flag === 0){
                    res.render('liverules', {length: quiz.qlength, time: quiz.qtime, id: quiz.quizId })
                }
                else if(flag === 1){
                    res.redirect(`/live/result/${req.params.quizid}`)
                }
            }else{
                res.redirect('/live')
            }
        })
        .catch(err => console.log(err))
}

module.exports.liveplay = (req, res) => {
    LiveActive.findOne({quizId: req.params.quizid})
        .then(quiz => {
            if(quiz){
                var flag = 0
                quiz.attempted.forEach(attempt => {
                    if(attempt.username === req.user.username){
                        flag = 1
                    }
                })
                if(flag === 0){
                    quiz.attempted.push({
                        username: req.user.username
                    })
                    quiz.save()
                        .then((quiz) => {
                            var timelim = quiz.qtime
                            UserQuiz.findOne({_id: quiz.quizId})
                                .then(quiz => {
                                    if(quiz) res.render('liveplay', {quiz, timelim})
                                    else res.redirect('/live')
                                })
                                
                        })
                        .catch(err => console.log(err))
                }
                else if(flag === 1){
                    res.redirect(`/live/result/${req.params.quizid}`)
                }
            }else{
                res.redirect('/live')
            }
        })
        .catch(err => console.log(err))
}

module.exports.livepost = (req, res) => {
    LiveActive.findOne({quizId: req.params.quizid})
        .then(quiz => {
            console.log(quiz.attempted)
            for(var i=0; i<quiz.attempted.length; i++){
                if(req.user.username === quiz.attempted[i].username){
                    quiz.attempted[i].correct = req.body.res;
                    break;
                }
            }
            quiz.save()
                .then(() => {
                    res.redirect(`/live/result/${req.params.quizid}`)
                })
        })
        .catch(err => console.log(err))
}

module.exports.liveres = (req, res) => {
    // res.send(req.params.quizid)
    LiveActive.findOne({quizId: req.params.quizid})
        .then(quiz => {
            if(quiz){
                console.log(quiz.attempted)
                for(var i=0; i<quiz.attempted.length; i++){
                    if(quiz.attempted[i].username === req.user.username){
                        var score = quiz.attempted[i].correct
                        break;
                    }
                }
                UserQuiz.findOne({_id: req.params.quizid})
                    .then(userquiz => {
                        var usq = [], adq = []
                        var flag = 1;
                        usq = {
                            quiz: userquiz,
                            flag
                        }
                
                        var flag = 0;
                        adq.push(flag)
                        var gamewrong = userquiz.questions.length - score
                        console.log(score)
                        res.render('results', {gamecorrect: score, gamewrong, usq, adq})
                    })                 
                
            }else{
                res.redirect('/live')
            }
        })
        .catch(err => console.log(err))
}