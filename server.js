const express = require('express')
const database = require('./database');
const bodyParser = require('body-parser')
const app = express()
const ingredientRouter = require('./routes/ingredientRoutes');
const recipeRouter = require('./routes/recipeRoutes');

//parse req of type JSON
app.use(bodyParser.json());

//parse req of type URL
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

app.use(ingredientRouter);
app.use(recipeRouter);