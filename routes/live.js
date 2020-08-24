const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

var { LiveActive, UserQuiz } = require('../models/schema')

var liveController = require('../controllers/live')

router.get('/', ensureAuthenticated, liveController.livehome)

router.get('/:quizid/rules', ensureAuthenticated, liveController.liverules)

router.get('/:quizid', ensureAuthenticated, liveController.liveplay)

router.post('/:quizid', liveController.livepost)

router.get('/result/:quizid', ensureAuthenticated, liveController.liveres)

module.exports = router