var MongoClient = require("mongodb").MongoClient;
var keys = require('../keys');
var url = keys.mongoDBUrl.mongo_url;
var assert = require("assert");
var mdbl = keys.mongoDBdb.mongoDBdb;
require('dotenv').config();

module.exports = function (app) {

    app.delete('/api/mongo/user-delete', function (req, res) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.db(mdbl).collection('urls');
            collection.remove({
                usId: req.user.foreignid
            }, {
                justOne: true
            }).then(results => {
                res.status(200).end();
            });
        });
    });

    app.put('/api/mongo/new-url', function (req, res) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.db(mdbl).collection('urls');
            var urlId = req.body.uId;
            var newUrl = req.body.url;
            var newComm = req.body.comment;
            var newFPath = req.body.filePath;
            if (err) throw err;
            collection.update({
                usId: req.user.foreignid
            }, {
                $push: {
                    urls: {
                        url: newUrl,
                        comment: newComm,
                        filePath: newFPath,
                        uId: urlId
                    }
                }
            }).then(results => {
                res.status(200).end();
            });
        });
    });

    app.put('/api/mongo/up-url', function (req, res) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.db(mdbl).collection('urls');
            var urlId = req.body.uId;
            var newUrl = req.body.url;
            var newComm = req.body.comment;
            var newFPath = req.body.filePath;
            if (err) throw err;
            collection.update({
                usId: req.user.foreignid,
                "urls.uId": urlId
            }, {
                $set: {
                    "urls.$.url": newUrl,
                    "urls.$.comment": newComm,
                    "urls.$.filePath": newFPath
                }
            }).then(results => {
                res.status(200).end();
            });

        });
    });

    app.put('/api/mongo/del-url', function (req, res) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.db(mdbl).collection('urls');
            var urlId = req.body.uId;
            if (err) throw err;
            assert.equal(null, err);
            collection.update({
                usId: req.user.foreignid
            }, {
                $pull: {
                    urls: {
                        uId: urlId
                    }
                }
            }).then(results => {
                res.status(200).end();
            });
        });
    });

}