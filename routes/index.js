var express = require('express');
var router = express.Router({ mergeParams: true });
let score = require('../models/score');
let User = require('../models/user');
var { check, validationResult, oneOf } = require('express-validator');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
  score.find({}, (err, scores) => {
    if (err) {
      console.log(err);
    } else {
      scoresList = scores;
      res.render('index', {
        title: 'Four score and a lot of time',
        list: scores
      });
    }
  }).sort('user')
    .sort('sport')
    .sort({ score: 'desc' });
});

router.route('/login').get((req, res) => {
  res.render('login');
});

router.route('/login').post([
  check('username').exists({ checkFalsy: true, checkNull: true }).withMessage('Username is required'),
  check('password').exists({ checkFalsy: true, checkNull: true }).withMessage('Password is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('login', {
      errors: errors.array()
    });
  } else {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
    req.session.user = req.body.username;
  }
});

module.exports = router;
