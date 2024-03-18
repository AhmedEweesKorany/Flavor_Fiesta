const Comment = require("../models/Comment")

const createComment = (req,res)=>{
    const data = req.body

    Comment.create(data,(err,data)=>{
        if(err) return res.status(400).json({message:"error happend",err:err})
        return res.status(200).json({message:"success"})
    })
}

const getCommentByRecipe = (req,res)=>{
    const id = req.params.id
    Comment.getCommentByRecipe(id,(err,data)=>{
        if(err) return res.status(400).json({message:"error happend ya 3ws",err:err})
        return res.status(200).json({message:"success",data:data})
    })
}


const getCommentByBlog = (req,res)=>{
    const id = req.params.id
    Comment.getCommentByBlog(id,(err,data)=>{
        if(err) return res.status(400).json({message:"error happend ya 3ws",err:err})
        return res.status(200).json({message:"success",data:data})
    })
}
module.exports = {
    createComment,getCommentByRecipe,getCommentByBlog
}