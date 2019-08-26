var express = require('express');
var router = express.Router({ mergeParams: true });
var Score = require('../models/score');

router.get('/', (req, res) => {
    const ID = req.params.id;
    res.render('score_info', {
        user: req.params.user,
        id: req.params.id
    });
});

module.exports = router;