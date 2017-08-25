module.exports = function(sequelize, DataTypes) {
  var Diary = sequelize.define("Diary", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Diary.associate = function(models) {
    // We're saying that a Diary should belong to an User
    // A Diary can't be created without an User due to the foreign key constraint
    Diary.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Diary;
};
