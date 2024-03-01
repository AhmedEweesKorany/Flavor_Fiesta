const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = require("./routes/router")
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(bodyParser.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)
app.use(cookieParser())
require("dotenv").config()
const portNum = +process.env.port || 3010


app.listen(portNum,()=>{
    console.log(`server running in http://localhost:${portNum}`)
})