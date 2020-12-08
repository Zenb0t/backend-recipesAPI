const Ingredient = require('../models/ingredient');

//Create a new ingredient
exports.create = (req, res) => {
    //let ingredient = req.body;
    //todo: add validation

    const ingredient = new Ingredient(req.body);
    ingredient
        .save()
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error when creating ingredient" })
        })
}


//Return all ingredients from the db
exports.findAll = (req, res) => {
    Ingredient.find()
        .then((ingredients) => {
            res.status(200).send(ingredients);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error finding all ingredients" })
        })
}

//Return an ingredient by id
exports.findOne = (req, res) => {
    Ingredient.findById(req.params.id)
        .then((ingredient) => {
            if (!ingredient) {
                return res.status(404).send({
                    message: "Ingredient not found with id " + req.params.id,
                });
            }
            res.status(200).send(ingredient);
            console.log(ingredient);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving ingredient with id" + req.params.id
            });
        });
}

//Remove ingredient from the db
exports.delete = (req, res) => {
    Ingredient.findByIdAndDelete(req.params.id)
        .then((ingredient) => {
            if (!ingredient) return res.status(404).send({ message: "Ingredient not found" });
            res.send({ message: "Ingredient deleted successfully" });
        })
        .catch((err) => {
            return res.status(500).send({ message: "Could not delete ingredient" })
        })
}

//Update an ingredient by id

exports.updateIngredient = (req, res) => {
    //todo Add validation of req.body

    Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((ingredient) => {
            if (!ingredient) return res.status(404).send({ message: "Ingredient not found" });
            res.status(200).send(ingredient);
        })
        .catch((err) => {
            return res.status(404).send({ message: "Error updating ingredient" })
        })
}