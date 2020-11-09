// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
var Sequelize = require('../models').sequelize;
var isAuthenticated = require("../config/middleware/isAuthenticated");
var keys = require('../keys.js'),
  MongoClient = require('mongodb').MongoClient,
  url = keys.mongoDBUrl.mongo_url,
  mdbl = keys.mongoDBdb.mongoDBdb,
  assert = require('assert'),
  Sequelize = require("../models").sequelize;
require('dotenv').config();

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {
      res.redirect("/index");
    } else {
      res.render("signup");
    }
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {
      res.redirect("/index");
    } else {
      res.render("login");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/index", isAuthenticated, function (req, res) {
  //   res.render("index");
  // });


  // Load index page & database connection within
  // a database connection
  app.get("/index", isAuthenticated, function (req, res) {
    db.Quote.findAll({
      order: [
        Sequelize.fn("RAND")
      ],
      limit: 1
    }).then(function (dbQuotes) {
      MongoClient.connect(url, function (err, mdb) {
        console.log("connected to mdb");
        var collection = mdb.db(mdbl).collection('urls');
        if (err) throw err;
        collection.find({
            usId: req.user.foreignid
          })
          .toArray(function (err, result) {
            if (err) throw err;
            res.render("index", {
              msg: "BookMarkY!",
              quotes: dbQuotes,
              user: result
            });
          });
      });
    });
  });

  // Load quote page and pass in an quote by id
  app.get("/quote/:id", function (req, res) {
    db.Quote.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbQuote) {
      res.render("quote", {
        quote: dbQuote
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};