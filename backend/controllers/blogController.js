const Blog = require("../models/Blog")

const getBlogs = (req,res)=>{
    Blog.getAllBlogs((err,data)=>{
        if(err){
            res.status(400).json({message:"error happend whiel getting blogs"})
        }else{
            res.status(200).json({message:"successful",data:data})
        }
    })
}

const getBlog = (req,res)=>{
    const {id} = req.params
    Blog.getSingleBlog(id,(err,data)=>{
        if(err){
            res.status(400).json({message:"error happend whiel getting blog"})
        }else{
            res.status(200).json({message:"successful",data:data})
        }
    })
}


module.exports = {
    getBlog,getBlogs
}