const db = require("../config/db");
const bcrypt = require("bcrypt");

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
    });
  },
  create: (userdata, callback) => {
    const { username, email, password } = userdata;
    db.query(
      "INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)",
      [username, email, password],
      (err, data) => {
        if (err) {
          return callback(err, null);
        }

        return callback(null, data);
      }
    );
  },
  update: async (userdata, id, callback) => {
    const { username, email, password } = userdata;
  
    // Check if a new password is provided
    if (password) {
      try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Update the user with the hashed password
        db.query(
          `UPDATE users
           SET username = ?,
               email = ?,
               password = ?
           WHERE id = ?`,
          [username, email, hashedPassword, id],
          (err, data) => {
            if (err) return callback(err, null);
            return callback(null, data);
          }
        );
      } catch (error) {
        // Handle bcrypt hashing error
        return callback(error, null);
      }
    } else {
      // If no new password provided, update user without changing the password
      db.query(
        `UPDATE users
         SET username = ?,
             email = ?
         WHERE id = ?`,
        [username, email, id],
        (err, data) => {
          if (err) return callback(err, null);
          return callback(null, data);
        }
      );
    }
  }, 
  delete: (id, callback) => {
    db.query("DELETE FROM `users` WHERE id =?", [id], (err, data) => {
      if (err) return callback(err, null);
      return callback(null, data);
    });
  },
};

module.exports = User;
