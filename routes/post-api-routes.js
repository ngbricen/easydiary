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
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.diary.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // Get rotue for retrieving a single Diary
  app.get("/api/diaries/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.diary.findOne({
      where: {
        id: req.params.id
      },
      include: [db.user]
    }).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // Diary route for saving a new Diary
  app.post("/api/diaries", function(req, res) {
    db.diary.create(req.body).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  // DELETE route for deleting Diarys
  app.delete("/api/diaries/:id", function(req, res) {
    db.diary.destroy({
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
};
