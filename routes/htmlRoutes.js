var db = require("../models");
var Sequelize = require('../models').sequelize;
var keys = require('../keys.js'),
    MongoClient = require('mongodb').MongoClient,
    url = keys.mongoDBUrl.mongo_url,
    assert = require('assert'),
    Sequelize = require("../models").sequelize;
require('dotenv').config();

module.exports = function(app) {
  // Load index page & database connection within
  // a database connection
  app.get("/", function(req, res) {
    db.Quote.findAll({
      order: [
        Sequelize.fn("RAND")
      ],
      limit: 1
    }).then(function(dbQuotes) {
      MongoClient.connect(url, function(err, mdb){
        console.log("connected to mdb");
        var collection = mdb.collection('urls');
        if(err) throw err;
        assert.equal(null, err);
        collection.find({userName: 'dreamwalker'})
        .toArray(function(err, result){
            if(err) throw err;
            res.render("index", {
              msg: "Welcome!",
              quotes: dbQuotes,
              user: result
            });
        });
      });
    });
  });

  // Load quote page and pass in an quote by id
  app.get("/quote/:id", function(req, res) {
    db.Quote.findOne({ where: { id: req.params.id } }).then(function(dbQuote) {
      res.render("quote", {
        quote: dbQuote
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
