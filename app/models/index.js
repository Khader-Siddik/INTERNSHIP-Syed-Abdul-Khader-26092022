const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.tutorials = require("./tutorial.model.js")(mongoose);  // Need to change later
db.classes = require("./class.model.js")(mongoose);
db.students = require("./student.model.js")(mongoose);

module.exports = db;