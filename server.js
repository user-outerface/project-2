require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");


var passport = require("passport");
var googleStrategy = require("passport-google-oauth20").Stragey;

// Move to routes.js
var keys = require("./config/keys");

var db = require("./models");

var app = express();

// Public token 
// clientID 1006752191890-btp7iod5rnp6ddppkfbnpvq6p9qfv9fk.apps.googleusercontent.com

// Private token
// clientSecret 9Hyf6L34cC9OVci_gFZac6jS

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/calback"
  },

  // Testing purposes only.
  (accessToken, refreshToken, profile, done) => {
    console.log("access token", accessToken);
    console.log("refresh token", refreshToken);
    console.log("profile:", profile);
  }
));


app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/callback", passport.authenticate("google"));

var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;