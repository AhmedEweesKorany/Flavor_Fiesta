const express = require("express");
const userController = require("../controllers/userController");

const recipesController = require("../controllers/recipesController");

const register = require("../Register");
const login = require("../Login");

const router = express.Router();

// user operations
router.get("/", userController.getAllUsers);
router.post("/adduser", userController.createUser);
router.put("/updateuser/:id", userController.updateUser);
router.delete("/deleteuser/:id", userController.deleteUser);

// Recipes operation

router.get("/recipes", recipesController.getAllRecipes);
router.get("/recipe/:id", recipesController.getOneRecipe);
router.get("/limitedRecipes", recipesController.getLimitedRecipes);
router.post("/addrecipe", recipesController.addNewRecipe);


// Blogs operations
router.get("/blogs", blogsController.getBlogs);
router.get("/blog/:id", blogsController.getBlog);
// Login and Register Operations (errorr ely mbwz eldenyaaaaaaaaaaaaaaaaaa)
router.post("/register", register);
router.post("/login", login.Login);
router.get("/logout", (req, res) =>{
    res.clearCookie("userToken")
})

router.get('/home', login.verifyToken, (req, res) => {
    res.json({message: "success"});
})

module.exports = router;