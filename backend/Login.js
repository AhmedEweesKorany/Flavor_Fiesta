const conn = require('./config/db')
const bcrypt = require("bcrypt")


const Login = async(req, res) =>{
        try {
          const { email, password } = req.body;
      
          const query = 'SELECT * FROM users WHERE email = ?';
          conn.execute(query, [email], async (err, result) => {
            if (err) {
              res.status(500).send({ message: 'Error in database query' });
            } else {
              if (result.length === 0) {
                res.status(401).send({ message: 'Email or password is incorrect' });
              } else {
                const matched = await bcrypt.compare(password, result[0].password);
                if (matched) {
                  res.status(200).send({ message: 'Login successful' });
                } else {
                  res.status(401).send({ message: 'Email or password is incorrect' });
                }
              }
            }
          });
        } catch (err) {
          res.status(500).send({ message: err.message });
          res.send("Error")
        }
}

module.exports = Login