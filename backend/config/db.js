const mysql = require("mysql2");

const db_server = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "falvor_fiesta",
  waitForConnections: true,
});


db_server.on("error",(err)=>{
    console.log("error happend",err)
})


module.exports = db_server;