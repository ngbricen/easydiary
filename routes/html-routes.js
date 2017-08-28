// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // signup route loads signup.html to allow user to sign up
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // blog route loads reset.html to reset password
  app.get("/reset", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reset.html"));
  });

  // route loads edit-diary.html
  app.get("/add-diary", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add-diary.html"));
  });

  // route loads view-diary.html
  app.get("/view-diary", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view-diary.html"));
  });

    // route loads login.html
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
};
