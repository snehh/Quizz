const express = require('express');
const router = express.Router();

const { ensureAuthenticated  } = require('../config/auth');
const { User, UserQuiz, Tags } = require('../models/schema');

const { userquizpost, userquizedit, userquizlive } = require('../controllers/userquiz')

router.get('/', ensureAuthenticated, (req, res) => {
    var user = req.user
    res.render('createnew')
})

router.post('/', userquizpost)
router.post('/:quizid/edit', userquizedit)
router.post('/:quizid/liveactive', userquizlive)

module.exports = router;