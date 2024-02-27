const express = require("express")
const userController = require("../controllers/userController")

const recipesController = require("../controllers/recipesController")

const register = require('../Register')
const login = require('../Login')

const router = express.Router()

// user operations 
router.get("/",userController.getAllUsers)
router.post("/adduser",userController.createUser)
router.put("/updateuser/:id",userController.updateUser)
router.delete("/deleteuser/:id",userController.deleteUser)

// Recipes operation

router.get("/recipes",recipesController.getAllRecipes)
router.get("/recipe/:id",recipesController.getOneRecipe)
router.post("/addrecipe",recipesController.addNewRecipe)


// Login and Register Operations (errorr ely mbwz eldenyaaaaaaaaaaaaaaaaaa)
// router.post('/register', register.register)
// router.post('/login', login.login)


module.exports= router;