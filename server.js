const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const ingredientRouter = require('./routes/ingredientRoutes');
const recipeRouter = require('./routes/recipeRoutes');

//parse req of type JSON
app.use(bodyParser.json());

//parse req of type URL
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;
const dbName = "test";

const uri = `mongodb+srv://dbmexepanela:bananadademarmelo@recipe-cluster1.fhuul.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

app.use(ingredientRouter);
app.use(recipeRouter);