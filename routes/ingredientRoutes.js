const express = require("express");
const send = require("send");
const app = express();
const ingredientController = require('../controllers/ingredientController');

//Create a new ingredients
app.post('/ingredients', ingredientController.create);

//Return all ingredients from the list
app.get("/ingredients", ingredientController.findAll);

//Return one ingredient from the list by id
app.get('/ingredients/:id', ingredientController.findOne)

//Delete an ingredient by id
app.delete('/ingredients/:id', ingredientController.delete);

//Update an ingredient by id
app.put('/ingredients/:id', ingredientController.updateIngredient);

//Patch an ingredient by id
app.patch('/ingredients/:id', ingredientController.updateIngredient)

module.exports = app;