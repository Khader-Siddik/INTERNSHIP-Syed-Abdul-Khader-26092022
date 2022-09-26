const db = require("../models");
const Student = db.students;
const Classes = require("../controllers/class.controller");

// Create and Save a new Student
exports.createStudent = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Please give Name. Name can not be empty!" });
        return;
    }

    const student = new Student({
        _name: req.body.name,
        rollNo: req.body.rollNo,
        mobileNo: req.body.mobileNo,
        classId: req.body.classId
    });

    student.save(student).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating Student data"
        });
    });
};

// Retrieve all Students from the database.
exports.findAllStudent = (req, res) => {
    const student = req.query.name;
    var condition = student ? { student: { $regex: new RegExp(student), $options: "i" } } : {};

    Student.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving Student(s)"
        });
    })
};

// Find a single Student with an id
exports.findOneStudent = (req, res) => {
    const id = req.params.id;

    Student.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: `No Student found with id ${id}` });
        else
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving Student with id <" + id + ">"
        });
    });
}

// Update a Student by the id in the request
exports.updateStudent = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please mention what data to update!"
        });
    }

    const id = req.params.id;

    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update Student (OR) Student may not be found  with id <" + id + ">."
                });
            } else {
                res.send({ message: "Student updated successfully." });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Student data with id <" + id + ">."
            })
        });
};

// Delete a Student with the specified id in the request
exports.deleteStudent = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            } else {
                res.send({
                    message: "Student was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};

// Delete all Student from the database.
exports.deleteAllStudent = (req, res) => {
    Student.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Students were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all students."
            });
        });
};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {

// };



