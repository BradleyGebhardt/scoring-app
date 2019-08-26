var express = require('express');
var router = express.Router({ mergeParams: true });
let user = require('../models/user');
let Score = require('../models/score');
var db = require('mongoose');
// var id = require('../public/js/main');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Score.findOne({ user: req.params.user }, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      console.log(found.user);
      res.render('user', {
        userInfo: found
      });
    }
  });
});

router.route('/').delete((req, res) => {
  let query = { _id: req.params.id };
  console.log(query);
  Score.deleteOne(query)
    .then(id => {
      res.send('success');
    })
    .catch(err => {
      res.status(400).send('Cannot delete score');
    })
});

module.exports = router;
