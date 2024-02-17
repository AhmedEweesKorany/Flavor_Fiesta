const db = require("../config/db");

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM `users`", (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },
  create: (userdata, callback) => {
    const { username, email, password } = userdata;
    db.query("INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)",[username,email,password],(err,data)=>{
        if(err){

            return callback(err,null)
        }
            
        return callback(null,data)
    });
  }, update: (userdata,id, callback) => {
    const { username, email, password } = userdata;
    db.query("UPDATE `users` SET `username`=?,`email`=?,`password`=? WHERE id = ?",[username,email,password,id],(err,data)=>{
        if(err) return callback(err,null)
        return callback(null,data)
    });
  }, delete: (id, callback) => {
    db.query("DELETE FROM `users` WHERE id =?",[id],(err,data)=>{
        if(err) return callback(err,null)
        return callback(null,data)
    });
  },
};

module.exports = User;
