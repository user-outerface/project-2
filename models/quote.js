module.exports = function(sequelize, DataTypes) {
  var Quote = sequelize.define("Quote", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Quote;
};
