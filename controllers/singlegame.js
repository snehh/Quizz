const Adminquiz = require('../models/schema').AdminQuiz
const arrayManip = require('../utils/arraymanip')

var questionArray = [];

module.exports.admingame = (req, res) => {
    const user = req.user
    //res.send({a:req.body.diff, b:req.body.len, c:req.params.topic})
    const {len, diff} = req.body;
    const topic = req.params.topic;
    let x;
    Adminquiz.findOne({ category: topic })
        .then(quiz => {
            if(quiz){
                if(diff == 'easy')
                    x = quiz.template[0].question;
                else
                    x = quiz.template[1].question;

                let y = arrayManip.questionJumble(len);
                
                questionArray = [];
                for(var i=0; i<y.length; i++){
                    questionArray.push({n:i+1, q:x[y[i]].q, a:x[y[i]].a, c:x[y[i]].correct});
                }
                res.render('singlegame', {questionArray, topic, diff, len, name: quiz.name});

            } else {
                res.redirect('/play/browse')
            }
        })
        .catch(err => console.log(err))
}

module.exports.adminRes = (req, res) => {
    var answers = [];
    for(i=1; i<=req.body.len; i++){
        if(req.body[i]) {
            var x = parseInt(req.body[i]);
            x %= 10;
            answers[i-1] = x;
        } else {
            answers[i-1] = 0;
        }
    }
    var gamecorrect = 0, gamewrong = 0;
    if(questionArray[0]){    
        for(i=0; i<req.body.len; i++){
            if(parseInt(questionArray[i].c) === answers[i])
                gamecorrect++;
            else gamewrong++;
        }
    }
    var user = req.user;
    user.correct += gamecorrect;
    user.wrong += gamewrong;
    user.save()
        .then(user => {
            var adq = {
                topic: req.body.topic,
                len: req.body.len,
                diff: req.body.diff,
                name: req.body.name,
                flag: 1
            }
            var usq = {
                flag: 0
            }
            res.render('results', {gamecorrect, gamewrong, usq, adq})
        })
        .catch(err => console.log(err))
}