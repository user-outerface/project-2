[Application](https://calm-ocean-96864.herokuapp.com/)

# **Collaborators**

* Francisco Arechiga
* Ronnie Barrio
* Jared Bryce
* Craig Wright

# **Purpose**

The purpose of this project was to create a bookmark manager utilizing two different databases, handlebars, and user authentication. 

Once the user creates an account, their information is stored on the databases. SQL manages the user logins, and MongoDB handles the urls for that user. The user can input any url they want, add comments to it, and fill out where the file path is in their bookmarks bar.

# **Major Technologies Used**

* MongoDB
* MySQL
* Sequelize
* Handlebars
* dotenv
* Express
* Node

# **Functionality**

## **On User Sign Up**

When a user creates an account, the api route `/api/signup` is hit. `app.post("/api/signup")` creates a user in MySQL, and in the promise section of the MySQL connection a connection to MongoDB is initiated to insert a document for the user where all of their urls will be stored.

A foreign id is created in the users, and the same id is given to the document in MongoDB for a cross-database reference. 

The user can add, delete, or update the urls that are shown to them on the `/index` page. The user can also edit the comment and file path that are associated with each url.

## **On User Log In**

After user login, the user is directed to `/index`. `app.get("/index")` connects to MySQL for a random quote, and connects to MongoDB to populate the user's page with their urls if they have previously stored urls in the database associated with their user name.

The backgrounds for the cards will be an image that's encoded in `base64`. This is handled by a google API that returns a base64 string that is an image of the website that you requested. The API is hit at page start, and will be hit a number of times that is equal to the amount of urls that the user has. The API is slow, so it takes a little while for the backgrounds for the cards to actually populate with it's respective image. 

The string given by the google API was base64, but with `two characters being replaced with two other characters`. What we had to do was find a way to convert the entire string given to us by the google API to make it readable for the browser. This is handled by this function:

```javascript
function reverseChanger(oldStr) {
  return oldStr.replace(/_/g, "/").replace(/-/g, "+");
};
```

## **Quotes**

The user can input a quote of their own and delete a quote if they choose to do so. 

