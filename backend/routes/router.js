const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

// user operations 
router.get("/",userController.getAllUsers)
router.post("/adduser",userController.createUser)
router.put("/updateuser/:id",userController.updateUser)
router.delete("/deleteuser/:id",userController.deleteUser)


module.exports= router;