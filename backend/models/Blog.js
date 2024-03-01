const db = require("../config/db");

const Blogs = {
    getAllBlogs:(call)=>{
        db.query("SELECT * FROM `blogs`",(err,data)=>{
            if(err){
                return call(err,null)
            }else{
                return call(null,data)
            }
        })
    },
    getSingleBlog:(id,call)=>{
        db.query("SELECT * FROM `blogs` WHERE blog_id = ?",[id],(err,data)=>{
            if(err) return call(err,null)

            return call(null,data)
        })
    }
}


module.exports = Blogs