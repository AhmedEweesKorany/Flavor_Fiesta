const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = require("./routes/router")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)
require("dotenv").config()
const portNum = +process.env.port || 3010


app.listen(portNum,()=>{
    console.log(`server running in http://localhost:${portNum}`)
})