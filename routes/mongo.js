var MongoClient = require("mongodb").MongoClient;
var keys = require('../keys');
var url = keys.mongoDBUrl.mongo_url;
var assert = require("assert");
require('dotenv').config();

module.exports = function(app){

    app.post('/api/mongo/user-new', function(req, res){
        MongoClient.connect(url, function(err, db){
            var usId = req.body.usId;
            var collectionUser = db.collection('userInfo');
            var collection = db.collection('urls');
            collectionUser.insert({foreignid: usId, userName: "bob"}).then(function(){
                collection.insert({foreignid: usId, userName: "bob"}).then(results => {
                    res.status(200).end();
                });
            });
        })
    });

    app.delete('/api/mongo/user-delete', function(req, res){
        MongoClient.connect(url, function(err, db){
            var collectionUser = db.collection('userInfo');
            var collection = db.collection('urls');
            collectionUser.remove({userName: "bob"}, {justOne: true}).then(function(){
                collection.remove({userName: "bob"}, {justOne: true}).then(results =>{
                    res.status(200).end();
                });
            });
        });
    });

    app.put('/api/mongo/new-url', function(req, res){
        MongoClient.connect(url, function(err, db){
            var collection = db.collection('urls');
            var urlId = req.body.uId;
            var newUrl = req.body.url;
            var newComm = req.body.comment;
            var newFPath = req.body.filePath;
            if(err) throw err;
            collection.update({userName: "dreamwalker"}, 
            {$push: {urls: {
                url: newUrl,
                comment: newComm,
                filePath: newFPath,
                uId: urlId
            }}}).then(results => {
                res.status(200).end();
            });
        });
    });

    app.put('/api/mongo/up-url', function(req, res){
        MongoClient.connect(url, function(err, db){
            var collection = db.collection('urls');
            var urlId = req.body.uId;
            var newUrl = req.body.url;
            var newComm = req.body.comment;
            var newFPath = req.body.filePath;
            if(err) throw err;
            collection.update({userName: "dreamwalker", 
            "urls.uId": urlId}, {$set: {
                "urls.$.url": newUrl,
                "urls.$.comment": newComm,
                "urls.$.filePath": newFPath
            }}).then(results => {
                res.status(200).end();
            });

        });
    });

    app.put('/api/mongo/del-url', function(req, res){
        MongoClient.connect(url, function(err, db){
            var collection = db.collection('urls');
            var urlId = req.body.uId;
            if(err) throw err;
            assert.equal(null, err);
            collection.update({userName: "dreamwalker"},
                { $pull: {urls: {uId: urlId}}}
            ).then(results =>{
                res.status(200).end();
            });
        });
    });

}