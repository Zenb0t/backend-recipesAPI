const express = require("express");
const send = require("send");
const recipeController = require("../controllers/recipeController");
const app = express();

//Return all recipes from the list
app.get("/recipes", recipeController.findAll);

//Return one recipe from the list by id
app.get('/recipes/:id', recipeController.findOne)

//Create a new recipe
app.post('/recipes', recipeController.create);

//Delete an recipe by id
app.delete('/recipes/:id', recipeController.delete);

//Update an recipe by id
app.put('/recipes/:id', recipeController.updateRecipe);

//Patch an recipe by id
app.patch('/recipes/:id', recipeController.updateRecipe);

module.exports = app;