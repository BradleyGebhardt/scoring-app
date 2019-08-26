var express = require('express');
var router = express.Router({mergeParams: true});
let score = require('../models/score');
let user = require('../models/user');

/* GET home page. */
router.get('/', function (req, res) {
  score.find({}, (err, scores) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { 
        title: 'Four score and a lot of time',
        list: scores
      });
    }
  }).sort('user')
    .sort('sport')
      .sort({score: 'desc'});
});

module.exports = router;
