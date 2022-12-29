//Dependencies
const express=require("express");
const app= express();
const methodOverride = require("method-override")
require("dotenv").config()

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
app.set("views", "path/to/views")

//Middleware
//Body parser gives us access to req.body
app.use(express.urlencoded({ extended: true}));
//delete methodoverride
app.use(methodOverride("_method"))
//Routes/Controller
const recipeController=require('./controllers/recipes.js')
app.use('/recipeBook', recipeController)
app.use(express.static('public'))

//listener
const PORT= process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
})


