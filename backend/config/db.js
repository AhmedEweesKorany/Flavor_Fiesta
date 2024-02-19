const mysql = require("mysql2");

const db_server = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_flavourfiestaaaaa",
  password: "C%CXNht4pX*ZB6?",
  database: "freedb_flavour",
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0, 
  port: 3306,
});


db_server.on("error",(err)=>{
    console.log("error happend",err)
})


module.exports = db_server;