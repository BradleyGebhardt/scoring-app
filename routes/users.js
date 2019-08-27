var express = require('express');
var router = express.Router({ mergeParams: true });
let user = require('../models/user');
let Score = require('../models/score');
var db = require('mongoose');
// var id = require('../public/js/main');

/* GET users listing. */
router.route('/:user/:id').get(function (req, res, next) {
  Score.findOne({ _id: req.params.id }, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      console.log(found._id);
      res.render('user', {
        userInfo: found
      });
    }
  });
});

router.route('/:user/:id').delete((req, res) => {
  let query = { _id: req.params.id };
  console.log(req.params.id);
  Score.deleteOne(query)
    .then(id => {
      req.flash('success', 'Deleted Score');
      res.send('success');
    })
    .catch(err => {
      res.status(400).send('Cannot delete score');
    })
});

router.route('/register').get((req, res) => {
  res.render('register');
})
module.exports = router;
