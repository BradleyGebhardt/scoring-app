var express = require('express');
var router = express.Router({mergeParams: true});
var Score = require('../models/score');

/* GET home page. */
router.get('/', function(req, res, next) {
  Score.find({}).where({sport: req.params.sport}).distinct('user', (err, users) => {
    if (err) {
      console.log(err);
    } else {
      if(users.length == 0) {
        res.render('sport', {
          title: req.params.sport,
          names: ['No one takes part']
        });
      } else {
        res.render('sport', {
          title: req.params.sport,
          names: users
        });
      }
    }
  });
});

module.exports = router;