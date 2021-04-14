const express = require("express");
const mongoose = require('mongoose')
const connectDB = require('./db')
const passport = require("passport");
const session = require('express-session')
const user = require('./models/user')
const app = express();


require('./passport')(passport)



connectDB()

app.use(passport.initialize())
app.use(passport.session())


app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    })
  )

app.use(express.static(__dirname));

app.get("/", function(request, response){
    response.sendFile(__dirname+"/login.html");
  
  })

  app.get("/home", function(request, response){
    response.sendFile(__dirname+"/home.html");

  })

  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });
  

  


  

app.listen(3000, console.log('Server running on port 3000'))