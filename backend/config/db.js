const mysql = require("mysql2");
require("dotenv").config()
const db_server = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0, 
  port: 3306,
});


db_server.on("error",(err)=>{
    console.log("error happend",err)
})


module.exports = db_server;