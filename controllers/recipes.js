const express = require('express');
const recipeRouter = express.Router();
const recipe=require("../models/recipe.js")

//Seed
const recipeSeed=require('../data.js');
const data = require('../data.js');
recipeRouter.get('/seed', (req,res)=> {
    recipe.deleteMany({}, (err) => {
        console.log(err);
        recipe.create(recipeSeed, (err,data) => {
            if(err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
    });
})

//Index
recipeRouter.get('/', (req,res)=> {
    recipe.find({},(err, recipe)=> {
        if(err){
            res.send(err)
        }else{
            res.render("index.ejs",{recipe})
        }
    })
})
//Show
recipeRouter.get('/:id', (res,req)=>{
    recipe.findById(res.params.id,(err,recipe)=>{
        if (err){
            res.send(err)
        } else{
            res.render('show.ejs',{recipe:recipe})
        }
    })

})
//Exports
module.exports=recipeRouter