const db = require("../config/db");
const bcrypt = require("bcrypt")

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM `users`", (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },
  getSingle: (id, callback) => {
    db.query("SELECT * FROM `users` WHERE `id` = ?", [id], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, result);
  })},
  create: (userdata, callback) => {
    const { username, email, password } = userdata;
    db.query("INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)",[username,email,password],(err,data)=>{
        if(err){

            return callback(err,null)
        }
            
        return callback(null,data)
    });
  },  update: async (userdata,id, callback) => {
    const { username, email, password } = userdata;
    const hashedPassword =  await bcrypt.hash(password, 10);
    db.query("UPDATE `users` SET `username`=?,`email`=?,`password`=? WHERE id = ?",[username,email,hashedPassword,id],(err,data)=>{
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
