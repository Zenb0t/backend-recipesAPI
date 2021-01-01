const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const querystring = require("querystring");

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
    user.save()
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

// Register

exports.register = (req, res) => {

}

// Login

exports.login = (req, res) => {
    res.redirect("/");
}

// Logout

exports.logout = (req, res) => {
    req.logOut();

    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo =
            process.env.NODE_ENV === "production"
                ? `${returnTo}/`
                : `${returnTo}:${port}/`;
    }

    const logOutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

    const searcString = querystring.stringify({
        clientid: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logOutURL.search = searcString;

    res.redirect(logOutURL);
}

//Callback for authentication

exports.callback = (req, res, next) => {
    passport.authenticate("auth0", (err, user, info) => {

        if (err) return next(err);
        if (!user) return res.redirect("/login");

        req.logIn(user, (err) => {
            if (err) return next(err);
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || "/");
        });
    })(req, res, next);
}