module.exports = function(sequelize, DataTypes) {
  var Quote = sequelize.define("Quote", {
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
  });
  return Quote;
};
