var express = require('express');
var router = express.Router({ mergeParams: true });
let User = require('../models/user');
let Score = require('../models/score');
const bcrypt = require('bcryptjs');
var db = require('mongoose');
var { check, validationResult, oneOf } = require('express-validator');
var allowed;
// var id = require('../public/js/main');

/* GET users listing. */
router.route('/:user/:id').get(function (req, res, next) {
  Score.findOne({ _id: req.params.id }, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      if (req.session.user == found.user) {
        allowed = true;
      } else {
        allowed = false;
      }
      res.render('user', {
        userInfo: found,
        signedInUser: allowed
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

router.route('/register').post([
  check('username').exists({ checkNull: true, checkFalsy: true }).withMessage('Username is a required field'),
  check('password').exists({ checkNull: true, checkFalsy: true }).withMessage('Password is a required filed'),
  check('password').isLength({ min: 8, max: 15 }).withMessage('Password is not the right length (min: 8 and max: 15)'),
  check('email').exists({ checkNull: true, checkFalsy: true }).isEmail().withMessage('Email is a required field')
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.body.password != req.body.password2) {
      req.flash('danger', 'Passwords do not match');
    }
    res.render('register', {
      errors: errors.array()
    });
  } else {
    var user = new User({
      username: req.body.username,
      password: req.body.password2,
      email: req.body.email
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            user.password = hash;
            user.save()
              .then(user => {
                req.flash('success', 'Added new user and you may now login');
                res.redirect('/login');
              })
              .catch(err => {
                res.status(400).send("unable to save to database");
              })
          }
        });
      }
    });

  }
});
module.exports = router;
