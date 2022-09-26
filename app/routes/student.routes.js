module.exports = app => {
    const students = require("../controllers/student.controller");
  
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/", students.createStudent);
  
    // Retrieve all Students
    router.get("/", students.findAllStudent);
  
    // Retrieve a single Student with id
    router.get("/:id", students.findOneStudent);
  
    // Update a Student with id
    router.put("/:id", students.updateStudent);
  
    // Delete a Student with id
    router.delete("/:id", students.deleteStudent);
  
    // Create a new Student
    router.delete("/", students.deleteAllStudent);
  
    app.use('/api/students', router);
  };