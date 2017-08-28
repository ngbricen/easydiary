module.exports = function(db) {

  db.User.create({
    name: 'Brice Nguoghia',
    email: 'bricen@gmail.com',
    password_hash: 'test'
  });

  db.User.create({
    name: 'Bob',
    email: 'bricen@gmail.com',
    password_hash: 'test1'
  });

};