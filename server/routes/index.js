/* /SERVER/MODELS/INDEX.JS*/
/* ABIRAMI KENNEDY        */
/* 300934720              */
/* MY FAVOURITE BOOKS     */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/users');
let User = userModel.User;

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
    displayName : req.user ? req.user.displayName : ''
   });
});

/* GET Login Page */
router.get('/login', (req, res, next) => {
  if(!req.user){
    res.render('auth/login',{
      title : "Login",
      messages : "Check your userId and password",
      displayName : req.user ? req.user.displayName : ''
    })
  }
  else{
    return res.redirect('/');
  }
});

/* POST LOgin Page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: "loginMessage",
  failureMessage: "Check your user ID and password"
})
);

/* GET Register Page */
router.get('/register', (req, res, next) => {
  if(!req.user){
    res.render('auth/register',{
      title : "Register",
      messages : req.flash('registerMessage'),
      displayName : req.user ? req.user.displayName : ''
    })
  }
  else{
    return res.redirect('/');
  }
});

/* POST Register Page */
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName : req.body.displayName
  })

  User.register(
    newUser,
    req.body.password,
    (err) => {
      if(err){
        console.log("Error : Cannot add user");
        if(err.name == "UserExistsError"){
          req.flash('registerMessage', 'Error: User exists');
          console.log('Error : User exists!');
        }
        return res.render('auth/register',{title : "Register",
        messages : req.flash('registerMessage'),
        displayName : req.user ? req.user.displayName : ''
      })
      }   
      else{
        return passport.authenticate('local')(req,res,()=>{
          res.redirect('/books');
        })
      }
  })
});

/* GET Logout Page */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
