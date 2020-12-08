const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    ingredientValueMap: {
        type: Map,
        of: Number,
        required: true,
    },
    ingredientMap: {
        type: Map,
        of: String,
        required: true,
    },
    instructions: [String],
    recipeProperties: {
        type: Map,
        of: Number,
        required: true,
    },
    imagepath: {
        type: String
    }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;