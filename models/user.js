module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    password_hash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
         // Remember to set the data value, otherwise it won't be validated
         this.setDataValue('password', val);
         this.setDataValue('password_hash', this.salt + val);
       },
       validate: {
          isLongEnough: function (val) {
            if (val.length < 7) {
              throw new Error("Please choose a longer password")
           }
        }
      }
    }
  });

  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Diary, {
      onDelete: "cascade"
    });
  };

  return User;
};
