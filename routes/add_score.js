var express = require('express');
var router = express.Router({ mergeParams: true });
var Score = require('../models/score');
var User = require('../models/user');
var { check, validationResult, oneOf } = require('express-validator');
var chosenSport;


/* GET home page. */
router.get('/', function (req, res, next) {
  chosenSport = req.params.sport;
  res.render('add_score', {
    sport: req.params.sport
  });
});

// Handle the post request 
router.route('/').post([
  check('username').exists({ checkNull: true, checkFalsy: true }).withMessage('Username is a required field'),
  check('score').exists({ checkNull: true, checkFalsy: true }).withMessage('Score is a required field')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('add_score', {
      sport: req.params.sport,
      errors: errors.array()
    })
  } else {
    var score = new Score();
    var user = new User();
    score.user = req.body.username;
    score.sport = req.params.sport;
    score.score = req.body.score;

    score.save()
      .then(score => {
        req.flash('success', 'Added Score');
        res.redirect('/');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      })
  }
});

module.exports = router;