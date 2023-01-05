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
                res.redirect("/recipeBook")
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
recipeRouter.get("/aboutMe",(req,res)=>{
    res.render('about.ejs',{recipe})
})
//New
recipeRouter.get('/new',(req,res)=>{
    res.render('new.ejs',{recipe})

})
//Delete
recipeRouter.delete('/:id',(req,res)=>{
    recipe.findByIdAndRemove(req.params.id, (err)=>{
        res.redirect("/recipeBook")
    })
})
//Update
recipeRouter.put('/:id', (req,res)=>{
    recipe.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,recipe)=>{
        res.redirect(`/recipeBook/${req.params.id}`)
    })
})
//Create
recipeRouter.post('/', (req,res)=>{
    recipe.create(req.body, (err,recipe)=>{
        res.redirect("/recipeBook")
    })
})
//Edit
recipeRouter.get('/:id/edit',(req,res)=>{
    recipe.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, recipe)=>{
        res.render('edit.ejs',{recipe})
    })
})
//Show
recipeRouter.get('/:id', (req,res)=>{
    recipe.findById(req.params.id,(err,recipe)=>{
        if(err) {
            res.send(err)
        } else {
            res.render('show.ejs',{recipe:recipe})
        }
    })

})
//Exports
module.exports=recipeRouter