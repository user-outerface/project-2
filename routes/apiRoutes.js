var db = require("../models");
var passport = require("../config/passport");
var keys = require('../keys.js');
var MongoClient = require('mongodb').MongoClient,
  url = keys.mongoDBUrl.mongo_url,
  assert = require('assert');
require('dotenv').config();

module.exports = function (app) {
  // Get all quotes
  app.get("/api/quotes", function (req, res) {
    db.Quote.findAll({}).then(function (dbQuotes) {
      res.json(dbQuotes);
    });
  });

  // Create a new quote
  app.post("/api/quotes", function (req, res) {
    db.Quote.create(req.body).then(function (dbQuote) {
      res.json(dbQuote);
    });
  });

  // Delete an quote by id
  app.delete("/api/quotes/:id", function (req, res) {
    db.Quote.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbQuote) {
      res.json(dbQuote);
    });
  });

  app.get("/api/peeker/", function (req, res) {
    res.send(keys.peeker);
  })

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the index page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the index page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/index");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    var mongoloid = req.body.username;
    var mongoId = req.body.foreignid;
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      foreignid: req.body.foreignid
    }).then(function () {
      console.log(req.body.foreignid + "YAAAAASSSSSS");

      MongoClient.connect(url, function (err, db) {
        var collection = db.collection('urls');
        collection.insert({
          usId: mongoId,
          userName: mongoloid,
        });
      })

      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });
};