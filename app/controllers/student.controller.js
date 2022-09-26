const db = require("../models");
const Student = db.students;
const Class = db.classes;

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

    Student.find({ rollNo: student.rollNo })
        .then(data => {
            if (data.length > 0) {
                res.status(400).send({ message: `Roll Number already exists. Unable to Save Student Details`, data: data });
                return;
            } else {
                Class.findById(student.classId).then(data => {
                    if (!data) {
                        res.status(404).send({ message: `No Class found with id <${student.classId}>. Please Check Given Class id is valid` });
                        return;
                    } else {
                        student.save(student).then(data => {
                            res.send({ message: "Student added successfully", data: data });
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Error occurred while creating Student data"
                            });
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || `Error occurred while Mapping Student ${student._name} with Class with id <${student.classId}>`
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while checking student validation."
            });
        });
};


exports.findAllStudentWithClassDetails = (req, res) => {
    const student = req.query.name;
    var condition = student ? { student: { $regex: new RegExp(student), $options: "i" } } : {};

    var obj = [];

    //[{ _name: "element._name", rollNo: "element.rollNo", mobileNo: "element.mobileNo", class: { standard: "classData.standard", division: "classData.division" }, createdAt: "element.createdAt", updatedAt: "element.updatedAt" }];
    Student.find(condition).then(studentData => {
        if (studentData.length > 0) {
            studentData.forEach(element => {
                var classId = element.classId;
                Class.findById(classId).then(classData => {
                    obj.push({ _name: element._name, rollNo: element.rollNo, mobileNo: element.mobileNo, class: classData, createdAt: element.createdAt, updatedAt: element.updatedAt });
                    if(obj.length == studentData.length){
                        res.send({ message: "Data Retrieved successfully", data: obj });
                    }
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving Student(s)"
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



