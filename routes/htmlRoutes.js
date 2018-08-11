// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var keys = require('../keys.js'),
  MongoClient = require('mongodb').MongoClient,
  url = keys.mongoDBUrl.mongo_url,
  assert = require('assert');
require('dotenv').config();

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/index", isAuthenticated, function (req, res) {
    res.render("index");
  });


  // Load index page & database connection within
  // a database connection
  app.get("/", function (req, res) {
    var dbExPasser;
    db.Example.findAll({}).then(function (dbExamples) {
      dbExPasser = dbExamples;
    });

    MongoClient.connect(url, function (err, mdb) {
      console.log("connected to mdb");
      var collection = mdb.collection('urls');
      if (err) throw err;
      assert.equal(null, err);
      collection.find({
          userName: 'dreamwalker'
        })
        .toArray(function (err, result) {
          if (err) throw err;
          res.render("index", {
            msg: "Welcome!",
            examples: dbExPasser,
            user: result
          });
        });
    });

  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};