'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'production';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

var sequelize;
if (process.env.JAWSDB_URL){ 
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else { 
  var sequelize = new Sequelize("tyqyc0s23aq7w7io", "nu3tggxsnmknn9f3", "zwoyjvf8xo1k182g", {
    port: 3306,
    host: "l6slz5o3eduzatkw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      idle: 30000
    }
  });
}


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
