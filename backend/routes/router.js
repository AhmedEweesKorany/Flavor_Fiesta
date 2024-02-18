const express = require("express")
const userController = require("../controllers/userController")

const recipesController = require("../controllers/recipesController")
const router = express.Router()

// user operations 
router.get("/",userController.getAllUsers)
router.post("/adduser",userController.createUser)
router.put("/updateuser/:id",userController.updateUser)
router.delete("/deleteuser/:id",userController.deleteUser)

// Recipes operation

router.get("/recipes",recipesController.getAllRecipes)

router.post("/addrecipe",recipesController.addNewRecipe)

module.exports= router;