var express = require('express');
var router = express.Router();
let uid2 = require("uid2");
let SHA256 = require("crypto-js/sha256");
let encBase64 = require("crypto-js/enc-base64");

let userModel = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route Sing Up
router.post('/sign-up', async function (req, res) {
  let result;
  let error = []
  let user;

    let isEmailUsed = await userModel.findOne({ email: req.body.email });
    //test si l'email est pas déja utilisé
    if (isEmailUsed) {
      result = false;
      error.push('Email déjà utilisé')

      // On test si les champs sont remplis
    }
    if (req.body.email === '' || req.body.password === '' || req.body.username === '') {
      result = false;
      error.push('Champs vides');

    }
    if(error.length === 0) {
      let salt = uid2(32);
      let newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        salt: salt,
        password: SHA256(req.body.password + salt).toString(encBase64),
        token: uid2(32),
        langue: ['fr', 'fr']
      });
      user = await newUser.save();
      if(user)
        result = true;
    }
  


  res.json({ result, error, user })
});


router.post('/sign-in', async function (req, res) {
  let error = [];
  let result = false;
  
  if (req.body.email === '' || req.body.password === '') {
    error.push('Vérifiez les champs de saisie');
  }

  let user = await userModel.findOne({email: req.body.email});
  if(user){
    let hash = SHA256(req.body.password + user.salt).toString(encBase64);
   
    if (hash === user.password)
      result = true;
    else {
      result = false;
      error.push('MDP invalide');
      user = null;
    }
  } else {
    
    error.push('Email Invalide');
  }

  res.json({ result, error, user });
})

router.post('/add-article/:token/:langueArt', async function(req, res){
  let user = await userModel.findOne({token: req.params.token});
  let isNewArticle = true;

  if(req.params.langueArt === 'fr'){
    for(let i=0; i<user.wishlistFR.length; i++){
      if(user.wishlistFR[i].title === req.body.title)
        isNewArticle = false;
    }
  
    if(isNewArticle)
      user.wishlistFR.push(req.body);

  } else if(req.params.langueArt === 'en'){
    for(let i=0; i<user.wishlistEN.length; i++){
      if(user.wishlistEN[i].title === req.body.title)
        isNewArticle = false;
    }
  
    if(isNewArticle)
      user.wishlistEN.push(req.body)
  }

  user = await user.save();

    res.json({result: isNewArticle});
  });

router.get('/get-wishlist/:token', async function(req, res, next){
  let user = await userModel.findOne({token: req.params.token});
  let result = false;

  if(user)
    result = true;

  res.json({result, user});

});

router.delete('/delete-article/:token/:pos/:langue', async function(req, res){

let user = await userModel.findOne({token: req.params.token});

if(req.params.langue === 'fr'){
  user.wishlistFR.splice(req.params.pos, 1);
} else if(req.params.langue === 'en'){
  user.wishlistEN.splice(req.params.pos, 1);
}


user = await user.save();
  res.json({user});
})

module.exports = router;
