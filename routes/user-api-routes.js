var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Diary
    console.log(req.params.email);
    console.log(req.params.password);
    db.User.findAll({
      include: [db.Diary]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Diary]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  app.get("/users/:email/:password", function(req, res) {
    console.log(req.params.email);
    console.log(req.params.password);
    db.User.findOne({
      where: {
        email: req.params.email,
        password_hash: req.params.password
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
