const Recipes = require("../models/Recips")


const getAllRecipes = (req,res)=>{
    Recipes.getAll((err,data)=>{
        if(err) { res.status(400).json({message:"error happend"})}
        else{
            res.status(200).json({message:"successful operation"})
        }

    })
}

const addNewRecipe  = (req,res)=>{

    const userdata = req.body
    Recipes.create(userdata,(err,data)=>{
        if(err){
            res.status(400).json({message:"error happend while adding new recipes",err:err})
        }else{
            res.status(200).json({
                message:"recipe created successfully"
            })
        }
    })
}

module.exports = {
    getAllRecipes,addNewRecipe
}