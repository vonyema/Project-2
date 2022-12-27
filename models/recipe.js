const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const recipeSchema= new Schema({
    img:{type: String},
    name: { type: String, required: true },
    ingredients:{type:[ingredientSchema], default:undefined},
    recipe: {type: String, required: true },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdDate: { type: Date, default: Date.now }
});

const ingredientSchema= new Schema({
    ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'},
    quantity: {type: Number, required: false},
    quantityType: {type: String, required: false}
});
var base=module.exports= mongoose.model("recipe", recipeSchema,'recipes');
base.Ingredients=module.exports=mongoose.model("ingredient", ingredientSchema, 'recipes');
var exports= module.exports=base;
