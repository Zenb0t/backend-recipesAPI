const User = require('../models/user');
const bcrypt = require('bcryptjs');

//Create a new User
exports.create = (req, res) => {
    //let User = req.body;
    //todo: add validation
    let hashedPass = bcrypt.hashSync(req.body.password);
    const user = new User({
        uuid: req.body.uuid,
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    });
    User.save()
        .then((user) => res.send(user))
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error when creating user" })
        })
}


//Return all Users from the db
exports.findAll = (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error finding all Users" })
        })
}

//Return an User by id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id,
                });
            }
            res.status(200).send(user);
            console.log(user);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving User with id" + req.params.id
            });
        });
}

//Remove User from the db
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            if (!user) return res.status(404).send({ message: "User not found" });
            res.send({ message: "User deleted successfully" });
        })
        .catch((err) => {
            return res.status(500).send({ message: "Could not delete User" })
        })
}

//Update an User by id

exports.updateUser = (req, res) => {
    //todo Add validation of req.body

    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => {
            if (!user) return res.status(404).send({ message: "User not found" });
            res.status(200).send(user);
        })
        .catch((err) => {
            return res.status(404).send({ message: "Error updating user" })
        })
}