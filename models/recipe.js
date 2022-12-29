const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const recipeSchema= new Schema({
    img:{type: String},
    name: { type: String, required: true },
    ingredients:{type: Array, required:true},
    recipe: {type: Array, required: true },
    creator: {
        type:String
        // type: mongoose.Schema.Types.ObjectId,
        // ref:'User'
    },
    createdDate: { type: Date, default: Date.now }
});

module.exports= mongoose.model("recipe", recipeSchema);
