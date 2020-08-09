
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
    
    var questionarray = [];
    questionarray.push({
        q: req.body.q1,
        a1: req.body.a11,
        a2: req.body.a12,
        a3: req.body.a13,
        a4: req.body.a14,
        correct: req.body.ans1
    }, {
        q: req.body.q2,
        a1: req.body.a21,
        a2: req.body.a22,
        a3: req.body.a23,
        a4: req.body.a24,
        correct: req.body.ans2 
    }, {
        q: req.body.q3,
        a1: req.body.a31,
        a2: req.body.a32,
        a3: req.body.a33,
        a4: req.body.a34,
        correct: req.body.ans3
    }, {
        q: req.body.q4,
        a1: req.body.a41,
        a2: req.body.a42,
        a3: req.body.a43,
        a4: req.body.a44,
        correct: req.body.ans4
    })

    if(req.body.q5){
        questionarray.push({
            q: req.body.q5,
            a1: req.body.a51,
            a2: req.body.a52,
            a3: req.body.a53,
            a4: req.body.a54,
            correct: req.body.ans5
        })
        if(req.body.q6){
            questionarray.push({
                q: req.body.q6,
                a1: req.body.a61,
                a2: req.body.a62,
                a3: req.body.a63,
                a4: req.body.a64,
                correct: req.body.ans6
            })
            if(req.body.q7){
                questionarray.push({
                    q: req.body.q7,
                    a1: req.body.a71,
                    a2: req.body.a72,
                    a3: req.body.a73,
                    a4: req.body.a74,
                    correct: req.body.ans7
                })
                if(req.body.q8){
                    questionarray.push({
                        q: req.body.q8,
                        a1: req.body.a81,
                        a2: req.body.a82,
                        a3: req.body.a83,
                        a4: req.body.a84,
                        correct: req.body.ans8
                    })
                    if(req.body.q9){
                        questionarray.push({
                            q: req.body.q9,
                            a1: req.body.a91,
                            a2: req.body.a92,
                            a3: req.body.a93,
                            a4: req.body.a94,
                            correct: req.body.ans9
                        })
                        if(req.body.q10s){
                            questionarray.push({
                                q: req.body.q10s,
                                a1: req.body.a101,
                                a2: req.body.a102,
                                a3: req.body.a103,
                                a4: req.body.a104,
                                correct: req.body.ans10
                            })
                        }
                    }
                }
            }
        }
    }
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
    var questionarray = [];
    questionarray.push({
        q: req.body.q1,
        a1: req.body.a11,
        a2: req.body.a12,
        a3: req.body.a13,
        a4: req.body.a14,
        correct: req.body.ans1
    }, {
        q: req.body.q2,
        a1: req.body.a21,
        a2: req.body.a22,
        a3: req.body.a23,
        a4: req.body.a24,
        correct: req.body.ans2 
    }, {
        q: req.body.q3,
        a1: req.body.a31,
        a2: req.body.a32,
        a3: req.body.a33,
        a4: req.body.a34,
        correct: req.body.ans3
    }, {
        q: req.body.q4,
        a1: req.body.a41,
        a2: req.body.a42,
        a3: req.body.a43,
        a4: req.body.a44,
        correct: req.body.ans4
    })

    if(req.body.q5){
        questionarray.push({
            q: req.body.q5,
            a1: req.body.a51,
            a2: req.body.a52,
            a3: req.body.a53,
            a4: req.body.a54,
            correct: req.body.ans5
        })
        if(req.body.q6){
            questionarray.push({
                q: req.body.q6,
                a1: req.body.a61,
                a2: req.body.a62,
                a3: req.body.a63,
                a4: req.body.a64,
                correct: req.body.ans6
            })
            if(req.body.q7){
                questionarray.push({
                    q: req.body.q7,
                    a1: req.body.a71,
                    a2: req.body.a72,
                    a3: req.body.a73,
                    a4: req.body.a74,
                    correct: req.body.ans7
                })
                if(req.body.q8){
                    questionarray.push({
                        q: req.body.q8,
                        a1: req.body.a81,
                        a2: req.body.a82,
                        a3: req.body.a83,
                        a4: req.body.a84,
                        correct: req.body.ans8
                    })
                    if(req.body.q9){
                        questionarray.push({
                            q: req.body.q9,
                            a1: req.body.a91,
                            a2: req.body.a92,
                            a3: req.body.a93,
                            a4: req.body.a94,
                            correct: req.body.ans9
                        })
                        if(req.body.q10){
                            questionarray.push({
                                q: req.body.q10,
                                a1: req.body.a101,
                                a2: req.body.a102,
                                a3: req.body.a103,
                                a4: req.body.a104,
                                correct: req.body.ans10
                            })
                        }
                    }
                }
            }
        }
    }
    UserQuiz.findOneAndUpdate({_id: req.params.quizid}, {questions: questionarray, title: title})
        .then(quiz => {
            res.redirect(`/user/${quiz.createdBy}/quizzes`)
        })
        .catch(err => console.log(err))
}