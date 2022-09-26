const db = require("../models");
const Class = db.classes;

// Create and Save a new Class
exports.createClass = (req, res) => {
    if (!req.body.standard) {
        res.status(400).send({ message: "Standard can not be empty!" });
        return;
    } else if (!req.body.division) {
        res.status(400).send({ message: "Division can not be empty!" });
        return;
    } 

    const _class = new Class({
        standard: req.body.standard,
        division: req.body.division
    });

    _class.save(_class).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while creating Class data"
        });
    });
};

// Retrieve all Classs from the database.
exports.findAllClass = (req, res) => {
    const _class = req.query.name;
    var condition = _class ? { _class: { $regex: new RegExp(_class), $options: "i" } } : {};

    Class.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving Class(s)"
        });
    })
};

// Find a single Class with an id
exports.findOneClass = (req, res) => {
    const id = req.params.id;

    Class.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: `No Class found with id ${id}` });
        else
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving Class with id <" + id + ">"
        });
    });
}

// Update a Class by the id in the request
exports.updateClass = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please mention what data to update!"
        });
    }

    const id = req.params.id;

    Class.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update Class (OR) Class may not be found  with id <" + id + ">."
                });
            } else {
                res.send({ message: "Class updated successfully." });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Class data with id <" + id + ">."
            })
        });
};

// Delete a Class with the specified id in the request
exports.deleteClass = (req, res) => {
    const id = req.params.id;

    Class.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Class with id=${id}. Maybe Class was not found!`
                });
            } else {
                res.send({
                    message: "Class was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Class with id=" + id
            });
        });
};

// Delete all Class from the database.
exports.deleteAllClass = (req, res) => {
    Class.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Classs were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all _classs."
            });
        });
};