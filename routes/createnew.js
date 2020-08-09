const express = require('express');
const router = express.Router();

const { ensureAuthenticated  } = require('../config/auth');
const { User, UserQuiz, Tags } = require('../models/schema');

const { userquizpost, userquizedit } = require('../controllers/userquiz')

router.get('/', ensureAuthenticated, (req, res) => {
    var user = req.user
    res.render('createnew')
})

router.post('/', userquizpost)
router.post('/:quizid/edit', userquizedit)

module.exports = router;