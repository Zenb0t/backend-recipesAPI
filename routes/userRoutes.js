const express = require("express");
const app = express();
const userController = require('../controllers/userController');

//!! Test only
app.get("/all", userController.findAll);

//Delete an user by id
app.delete('/:id', userController.delete);

//Update an user by id
app.put('/:id', userController.updateUser);

//Patch an user by id
app.patch('/:id', userController.updateUser);

// Registration and Login

app.post("/register", userController.register);
app.post("/login", userController.login)

//Return one user from db by id
app.get("/:id")

