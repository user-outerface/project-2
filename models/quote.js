module.exports = function(sequelize, DataTypes) {
  var Quote = sequelize.define("Quote", {
<<<<<<< HEAD:models/example.js
    words: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 140]
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
=======
    text: DataTypes.STRING,
    description: DataTypes.TEXT
>>>>>>> master:models/quote.js
  });
  return Quote;
};
