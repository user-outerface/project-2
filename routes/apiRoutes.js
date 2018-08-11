var db = require("../models");
var keys = require('../keys.js');
require('dotenv').config();

module.exports = function(app) {
  // Get all examples
  app.put("/api/update/comment", function(req, res) {
    db.Quote.update(req.body, {
        where: {
          id: req.body.id
        }}).then(function(routerPost) {
        res.json(routerPost);
      });
  });
  
  app.post("/api/new/comment", function(req, res) {
    db.Quote.create({
      id: req.body.id,
      words: req.body.words
    }).then(function(routerPost){
      res.json(routerPost)
    });
  });

  app.get("/api/peeker/", function(req, res){
    res.send(keys.peeker);
  })
};
