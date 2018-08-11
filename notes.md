**for creating**

`db.urls.insert()`

ex:

db.urls.insert({userName: "dreamwalker", urls: [{url: "www.google.com", comment: "This is a great search engine!", filePath: "path/in/bookmark/bar", uId: "1"}, {url: "www.facebook.com", comment: "Nobody is here by choice anymore", filePath: "path/in/bookmark/bar", uId: "2"}, {url: "www.reddit.com", comment: "Yest another highly addictive site.", filePath: "no/escape", uId: "3"}] })

**for seeing everything in cli**

db.urls.find().pretty();

**for inserting singular url in user's collection:**
`*update method*`

db.urls.update( {userName: "dreamwalker"}, { $push: {"urls": {"url": "www.whaev.com", "filePath": "do/dee/doo", uId: 4}}} );

**for deleting singular url in user's collection:**
`*update method*`

db.urls.update( {userName: "dreamwalker"}, { $pull: {"urls": {"url": "www.whaev.com", "filePath": "do/dee/doo"}}} )

db.urls.update({userName: "dreamwalker"}, { $pull: {"urls": {"uId": "4"}}})

**for updating singular url in user's collection:**

db.urls.update({userName: "dreamwalker", "urls.uId": "4"}, {$set: {"urls.$.url": "www.whatev.com"}})

db.urls.update({userName: "dreamwalker", "urls.uId": "4"}, {$set: {"urls.$.url": "www.whatever.com", "urls.$.filePath": "this/here", "urls.$.comment": "Yess, works too!"}})

**set/unset**

$set: `query`
$unset: `query`

Use this so you don't have to delete the entire person

**for deletion**

```javascript
// db.collection.remove(
//     <query>,
//     {
//         justOne: <boolean>,
//         writeConcern: <document>,
//         collation: <document>
//     }
// )
```

db.urls.remove({userName: "dreamwalker"}, {
    justOne: true
})

db.urls.remove({_id: ObjectId("")}, {justOne: true})

# **Random Key Generator**]

* Add a time or date stamp for the first bit, then add the random key generator to the end eg: `time&|date-makeid()`

```javascript

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());

```

# **On Creating A New Collection**

The method for grabbing a collection will create a new collection if one doesn't exist.
 Eg. `db.getCollection("userInfo")` will create a new collection if it doesn't exist. You do have to populate it for it to be visible in the cli and gui though. For this, just populate it like you would normally.

 Keep in mind, you do have to specify to mongodb that you are using a certain database for this. In cli, this will look like this: `use example_db`. In scripting, it will look different but pretty much the same concept.