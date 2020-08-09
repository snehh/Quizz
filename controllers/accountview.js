const { UserQuiz } = require('../models/schema.js');

const User = require('../models/schema.js').User

module.exports.homeview = (req, res) => {
    const user = req.user

    if(user.username !== req.params.username) {
      res.redirect(`/user/view/${req.params.username}`)
    }
    else res.render('home', { user });
}

module.exports.otherview = (req, res) => {
    const user = req.user

    if(user.username === req.params.username) {
        res.redirect(`/user/${req.params.username}`)
    }

    else {
        User.findOne({username: req.params.username})
            .then(user1 => {
                if(user1){
                    res.render('others_view', { user: user1 })
                } else {
                    res.redirect('/error')
                }
            })
            .catch(err => console.log(err))
    }
}

module.exports.userlist = (req, res) => {
    const user = req.user

    if(user.username !== req.params.username) {

        User.findOne({username: req.params.username})
            .then(user1 => {
                if(user1) {
                    var name = user1.username + "'s"
                    UserQuiz.find({createdBy: user1.username})
                        .then(quizlist => {
                            quizlist.reverse()
                            res.render('myquizlist', {quizlist, username: user1.username, name})
                        })
                        .catch(err => console.log(err))
                }
                else res.redirect(`/user/${req.user.username}/quizzes`)
            })
            .catch(err => console.log(err))
    }

    else{
        var name = "My"
        UserQuiz.find({createdBy: user.username})
            .then(quizlist => {
                quizlist.reverse()
                res.render('myquizlist', {quizlist, username: user.username, name})
            })
            .catch(err => console.log(err))
    }
}