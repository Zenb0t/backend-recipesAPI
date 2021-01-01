const express = require("express");
const passport = require("passport");
const app = express();
const userController = require('../controllers/userController');

//!! Test only
app.get("/all", userController.findAll);

//Return one user from db by id
app.get("/:id")

//Delete an user by id
app.delete('/:id', userController.delete);

//Update an user by id
app.put('/:id', userController.updateUser);

//Patch an user by id
app.patch('/:id', userController.updateUser);

// Registration 
//!! Test 
app.post("/register", userController.create); 

// Login and Logout

app.get("/login", passport.authenticate("auth0", {
    scope: "openid email profile"
}),
    userController.login);

app.get("/callback", userController.callback);

app.get("/logout", userController.logout)

module.exports = app;



