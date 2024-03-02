const conn = require('./config/db')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
            // Authentication User
            const accessToken = jwt.sign({email: email, password: password}, "jwt-secret-key", {expiresIn: "1d"})
            console.log({accessToken: accessToken})
            res.cookie("userToken", accessToken, { httpOnly: true, secure: true });

            res.status(200).send({ message: 'Login successful',data:result });
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


const verifyToken = (req, res, next) => {
  const token = req.cookies.userToken
  if(!token){
    res.json("The token wasn't available")
    res.redirect("/login")
  }
  else{
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Token is invalid")
      next()
    })
  }
}

module.exports = {Login, verifyToken}