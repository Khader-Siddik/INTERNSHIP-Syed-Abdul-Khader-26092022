module.exports = app => {
    const classes = require("../controllers/class.controller");
  
    var router = require("express").Router();
  
    // Create a new Class
    router.post("/", classes.createClass);
  
    // Retrieve all Classs
    router.get("/", classes.findAllClass);
  
    // Retrieve a single Class with id
    router.get("/:id", classes.findOneClass);
  
    // Update a Class with id
    router.put("/:id", classes.updateClass);
  
    // Delete a Class with id
    router.delete("/:id", classes.deleteClass);
  
    // Create a new Class
    router.delete("/", classes.deleteAllClass);
  
    app.use('/api/classes', router);
  };