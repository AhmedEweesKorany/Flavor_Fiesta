const User = require("../models/User")


const getAllUsers = (req,res)=>{
    User.getAll((err,data)=>{
        if(err){
            res.status(400).json({message:"error happend "})
        }else{
            res.status(200).json({message:"no errors ya b5tk",data:data})
        }
    })
}



const createUser = (req,res)=>{
    const data = req.body
  User.create(data,(err,result)=>{
    if(err){
        res.status(400).json({message:"error happend "})
    }else{
        res.status(200).json({message:"no errors ya b5tk and user created successgffully"})
    }
  })
}


const updateUser = (req,res)=>{
    const {id} = req.params
    const data = req.body
    User.update(data,id,(err,result)=>{
        if(err){
            res.status(400).json({message:"error happend from update"})
        }else{
            res.status(200).json({message:"no errors ya b5tk and user updated successgffully"})
        }
    })
}


const deleteUser = (req,res)=>{
    const {id} = req.params
    User.delete(id,(err,result)=>{
        if(err){
            res.status(400).json({message:"error happend from delete"})
        }else{
            res.status(200).json({message:"no errors ya b5tk and user deleted successgffully"})
        }
    })
}
module.exports = {getAllUsers,createUser,updateUser,deleteUser}