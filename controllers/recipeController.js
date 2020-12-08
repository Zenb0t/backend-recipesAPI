const Recipe = require('../models/recipe');

//Create a new recipe
exports.create = (req, res) => {
    //let recipe = req.body;
    //todo: add validation

    const recipe = new Recipe(req.body);
    recipe
        .save()
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error when creating recipe" })
        })
}


//Return all recipes from the db
exports.findAll = (req, res) => {
    Recipe.find()
        .then((recipes) => {
            res.status(200).send(recipes);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error finding all recipes" })
        })
}

//Return a recipe by id
exports.findOne = (req, res) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
            if (!recipe) {
                return res.status(404).send({
                    message: "recipe not found with id " + req.params.id,
                });
            }
            res.status(200).send(recipe);
            console.log(recipe);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving recipe with id" + req.params.id
            });
        });
}

//Remove recipe from the db
exports.delete = (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then((recipe) => {
            if (!recipe) return res.status(404).send({ message: "recipe not found" });
            res.send({ message: "recipe deleted successfully" });
        })
        .catch((err) => {
            return res.status(500).send({ message: "Could not delete recipe" })
        })
}

//Update an recipe by id

exports.updateRecipe = (req, res) => {
    //todo Add validation of req.body

    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((recipe) => {
            if (!recipe) return res.status(404).send({ message: "recipe not found" });
            res.status(200).send(recipe);
        })
        .catch((err) => {
            return res.status(404).send({ message: "Error updating recipe" })
        })
}