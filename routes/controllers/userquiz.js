
const { UserQuiz, User, Tags } = require('../models/schema');

module.exports.userquizpost = (req,res) => {
    var title = req.body.title;
    var tagarray = [];
    if(!req.body.tags){
        tagarray.push(req.body.tag);
    }
    else{
        tagarray = req.body.tags.split(" ")
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
                        // Tags.insertMany(tagsarr)
                        //     .then(() => {
                        //         res.redirect(`/user/${user.username}/quizzes`)
                        //     })
                        //     .catch(err => console.log(err))
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