const express = require('express');
const router = express.Router();

const { ensureAuthenticated  } = require('../config/auth');
const singleGame = require('../controllers/singlegame');

router.get('/browse', ensureAuthenticated, (req, res) => {
    const user = req.user;

    res.render('browse')
})

router.get('/:topic', ensureAuthenticated, (req, res) => {
    const user = req.user;
    const topic = req.params.topic.toString();

    if(topic == 'chemistry' || topic == 'sports' || topic == 'geography' || topic == 'gk' || topic == 'artnlits' || topic == 'filmntv' || topic == 'astronomy' || topic == 'history'){
        res.render('gamecontrols', {topic})
    } else {
        res.redirect('/play/browse')
    }
})

router.post('/:topic', singleGame.admingame)

router.post('/:topic/results', singleGame.adminRes)

module.exports = router;