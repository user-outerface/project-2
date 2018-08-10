var keys = require('../keys.js'),
    MongoClient = require('mongodb').MongoClient,
    url = keys.mongoDBUrl.mongo_url,
    assert = require('assert');
require('dotenv').config();

module.exports = function(app){
    // app.get("/sdfs", function(req, res){
    //     console.log("internaly hit");
    //     MongoClient.connect(url, function(err, db){
    //         console.log("connected to mdb");
    //         var collection = db.collection('tester_db');
    //         if(err) throw err;
    //         assert.equal(null, err);
    //         collection.find({userName: 'dreamwalker'})
    //         .toArray(function(err, result){
    //             if(err) throw err;
    //             var handObj = {
    //                 user: result
    //             };
    //             res.render('index', handObj);
    //         });
    //     });
    // });
};