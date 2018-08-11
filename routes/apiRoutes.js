var db = require("../models");
var keys = require('../keys.js');
var Sequelize = require("../models").sequelize;
require('dotenv').config();

module.exports = function(app) {
  // Get all quotes
  app.get("/api/quotes", function(req, res) {
    db.Quote.findAll({
      order: [
      Sequelize.fn("RAND")
    ],
    limit: 1
    }).then(function(dbQuotes) {
      res.json(dbQuotes);
    });
  });

  // Create a new quote
  app.post("/api/quotes", function(req, res) {
    db.Quote.create(req.body).then(function(dbQuote) {
      res.json(dbQuote);
    });
  });

  // Delete an quote by id
  app.delete("/api/quotes/:id", function(req, res) {
    db.Quote.destroy({ where: { id: req.params.id } }).then(function(dbQuote) {
      res.json(dbQuote);
    });
  });

  app.get("/api/peeker/", function(req, res){
    res.send(keys.peeker);
  })
};
