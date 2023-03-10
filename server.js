//Dependencies
const express=require("express");
const app= express();
const path = require('path');
const methodOverride = require("method-override")
require("dotenv").config()
const Recipe=require("./models/recipe.js")

//dependencies
const mongoose= require("mongoose")
const recipe=require("./controllers/recipes.js")
const data= require('./data.js')

//Database Connection
mongoose.connect(process.env.DATABASE_URI)

//Database Connection Error/Success
const db= mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
app.use((req, res, next) => {
    console.log("I run for all routes");
    next()
})
// set the view engine to ejs
app.set('view engine', 'ejs');

//Middleware
//Body parser gives us access to req.body
app.use(express.urlencoded({ extended: true}));
//delete methodoverride
app.use(methodOverride("_method"))
//static middleware(images,css,css files)
app.use(express.static('.'))
//Routes/Controller
const recipeController=require('./controllers/recipes.js')
app.use('/recipeBook', recipeController)
// app.use(express.static('public'))

const { RecipeSearchClient } = require('edamam-api');

const client = new RecipeSearchClient({
  appId: 'a8f27fcc',
  appKey: '55210688b858c7de3044364de93ee2ba'
});
app.get('/',(req,res)=>{
  Recipe.find({},(err,recipe)=>{
    res.render('index.ejs',{recipe})
  })
})
//listener
const PORT= process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
})


