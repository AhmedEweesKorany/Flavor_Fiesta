const db = require("../config/db")

const Comment = {
    create:(data,callback)=>{
        const {userID,message,blogID,recipeID,username} = data
        const query  = "INSERT INTO `comments`(`comment_content`, `user_id`, `blog_id`, `recipe_id`,`username`) VALUES (?,?,?,?,?)"

        db.query(query,[message,userID,blogID,recipeID,username],(err,data)=>{
            if(err)  return callback(err,null)
            return callback(null,data)
        })
    },

    getCommentByRecipe:(id,callback) =>{
        db.query("SELECT * FROM `comments` WHERE recipe_id = ?", [id],(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,data)
        })
    },
    getCommentByBlog:(id,callback) =>{
        db.query("SELECT * FROM `comments` WHERE blog_id = ?", [id],(err,data)=>{
            if(err) return callback(err,null)
            return callback(null,data)
        })
    }
}

module.exports = Comment