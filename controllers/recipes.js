const express = require('express');
const recipeRouter = express.Router();
const recipe=require("../models/recipe.js")
const ingredients=require("../models/recipe.js")
const data= require('../data.js')

//Seed
const recipeSeed= require("../data.js")
recipeRouter.get('/seed', (req,res)=> {
    recipe.deleteMany({}, (err, allRecipes) => {});
    recipe.create(recipeSeed, (err, data) => {
        res.redirect('/recipeBook')
    })
})

//Index
recipeRouter.get('/', (req,res)=> {
    recipe.find({},(err, recipe)=> {
        res.render("index.ejs",{recipe})
    })
})