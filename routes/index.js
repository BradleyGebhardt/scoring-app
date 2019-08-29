var express = require('express');
var router = express.Router({ mergeParams: true });
let score = require('../models/score');
var scoresList;
let User = require('../models/user');
var { check, validationResult, oneOf } = require('express-validator');

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
      console.log(req.session.user);
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
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('login', {
      errors: errors.array()
    });
  } else {
    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
      if(err) {
        console.log(err);
      } else {
        if(user) {
          req.session.user = user.username;
          res.redirect('/');
        } else {
          req.flash('danger', 'Username or password is incorrect');
          res.render('login');
        }
      }
    });
    // User.find({}, (err, user) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     if (user.length != 0) {
    //       req.session.user = req.body.username;
    //       console.log(req.body.username);
    //       score.find({}, (err, scores) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           scoresList = scores;
    //           res.render('index', {
    //             title: 'Four score and a lot of time',
    //             list: scores
    //           });
    //         }
    //       })
    //         .sort('user')
    //         .sort('sport')
    //         .sort({ score: 'desc' });
    //     } else {
    //       req.flash('danger', 'Username or password is incorrect');
    //     }
    //   }
    // });
  }
});

module.exports = router;
