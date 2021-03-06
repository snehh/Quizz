
const { UserQuiz, User, Tags, LiveActive } = require('../models/schema');

module.exports.userquizpost = (req,res) => {
    var title = req.body.title;
    var tagarray = [];
    if(!req.body.tags){
        tagarray.push(req.body.tag);
    }
    else{
        tagarray = req.body.tags.split(" ")
        if(req.body.tag && req.body.tag != ' ' ) tagarray.push(req.body.tag)
    }
    
    var questionarray = req.body.questionarray;
    
    
    const currentDate = new Date().toDateString()
    const newQuiz = new UserQuiz({
        title: title,
        createdBy: req.user.username,
        tags: tagarray,
        createdOn: currentDate,
        questions: questionarray
    })
    newQuiz.save()
    .then(() => {
        User.findOne({username: req.user.username})
            .then(user => {
                user.quizno = user.quizno + 1
                user.save()
                    .then(() => {
                        var user = req.user
                        var tagsarr = [];
                        for(var i=0; i<tagarray.length; i++){
                            var element = {
                                tagname: tagarray[i]
                            }
                            tagsarr.push(element)
                        }
                        tagsarr.forEach(function(n, index) {
                            Tags.findOneAndUpdate( n, n, { upsert: true }, function(err,doc) {
                                if(err) console.log(err)
                                if(index === tagsarr.length - 1) res.redirect(`/user/${user.username}/quizzes`)
                            });
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

module.exports.userquizedit = (req, res) => {
    
    var title = req.body.title;
    var questionarray = req.body.questionarray;
    
    UserQuiz.findOneAndUpdate({_id: req.params.quizid}, {questions: questionarray, title: title})
        .then(quiz => {
            res.redirect(`/user/${quiz.createdBy}/quizzes`)
        })
        .catch(err => console.log(err))
}

module.exports.userquizlive = (req, res) => {
    
    UserQuiz.findOne({_id: req.params.quizid})
        .then(quiz => {
    
            var newLive = new LiveActive({
                createdAt: new Date(),
                qname: quiz.title,
                quizId: req.params.quizid,
                qtime: req.body.timelim,
                createdBy: quiz.createdBy,
                qlength: quiz.questions.length
            })

            var date = new Date(newLive.createdAt);
            date.setDate(date.getDate() + 7);
            newLive.endOn = date

            newLive.save()
                .then(() => {
                    res.redirect(`/user/${quiz.createdBy}/quizzes`)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}