const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        quantityPerUnit: {
            type: Number,
            required: true,
        },
        measureUnit: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        unitCost: {
            type: Number,
            required: true,
        },
    });

const Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;
