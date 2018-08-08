var db = require("../models");
var keys = require('../keys.js'),
    MongoClient = require('mongodb').MongoClient,
    url = keys.mongoDBUrl.mongo_url,
    assert = require('assert');
require('dotenv').config();

module.exports = function(app) {
  // Load index page & database connection within
  // a database connection
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      // MongoClient.connect(url, function(err, mdb){
      //   console.log("connected to mdb");
      //   var collection = mdb.collection('urls');
      //   if(err) throw err;
      //   assert.equal(null, err);
      //   collection.find({userName: 'dreamwalker'})
      //   .toArray(function(err, result){
      //       if(err) throw err;
      //       res.render("index", {
      //         msg: "Welcome!",
      //         examples: dbExamples,
      //         user: result
      //       });
      //   });
      // });
      console.log("welcome");

      res.render("index", {examples: dbExamples});
    });
    
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
