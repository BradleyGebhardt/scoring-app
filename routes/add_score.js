var express = require('express');
var router = express.Router({mergeParams: true});
var Score = require('../models/score');
var User = require('../models/user');
var chosenSport;


/* GET home page. */
router.get('/', function(req, res, next) {
  chosenSport = req.params.sport;
  res.render('add_score', {
      sport: req.params.sport
  });
});

// Handle the post request 
router.route('/').post((req, res) => {
  var score = new Score();
  var user = new User();
  score.user = req.body.username;
  score.sport = chosenSport;
  score.score = req.body.score;
  user.username = req.body.username;

  score.save()
    .then(score => {
      res.redirect('/');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    })

    console.log(User.findOne({username: user.username}).username);

    if(User.findOne({username: user.username}).username == undefined) {
      user.password = 'pass';
      user.save()
        .then(user => {
          console.log('Added new user');
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        })
    }
});

module.exports = router;