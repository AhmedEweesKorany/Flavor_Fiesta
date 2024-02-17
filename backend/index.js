const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = require("./routes/router")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)
require("dotenv").config()
const portNum = +process.env.port || 3010


app.listen(portNum,()=>{
    console.log(`server running in https://localhost:${portNum}`)
})