module.exports = function(sequelize, DataTypes) {
  var Bookmarks = sequelize.define("bookmark_data", {
    description: DataTypes.STRING,
    catagory: DataTypes.STRING,
    url: DataTypes.STRING
  });
  return Bookmarks;
};
