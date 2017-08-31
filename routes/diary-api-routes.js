// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Diary
  app.get("/api/diaries", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.userId = req.query.user_id;
    }
    
    //Filter to get only public diaries
    query.isPublic = true;

    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.Diary.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // Get for retrieving multiple diaries from a single user
  app.get("/api/diaries/:id", function(req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Diary]
    }).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // Get for retrieving single diaries from a single user
  app.get("/api/diary/:id", function(req, res) {
    db.Diary.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // Diary route for saving a new Diary
  app.post("/api/diaries", function(req, res) {
    console.log(req.body);
    db.Diary.create(req.body).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // DELETE route for deleting Diarys
  app.delete("/api/diaries/:id", function(req, res) {
    db.Diary.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // PUT route for updating Diarys
  app.put("/api/diaries", function(req, res) {
    db.Diary.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbDiary) {
        res.json(dbDiary);
      });
  });

  //PUT to update a single diary
  app.put("/api/diaries/:id", function(req, res) {
    console.log(req.body);
    db.Diary.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbDiary) {
        res.json(dbDiary);
      });
  });
};
