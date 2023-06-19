
const { connection } = require("./db")



const cors=require("cors")
require("dotenv").config()
const express=require("express")

const { repoRouter } = require("./Routes/repo.create")
const { userRoute } = require("./Routes/user.routes")


const app= express()
app.use(cors())
app.use(express.json())
app.use("/users" ,userRoute )
app.use("/create",repoRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`port is running at ${process.env.port}`);
        console.log("connected to db");
    } catch (error) {
        console.log(error.message);
        console.log("Sometthing went to wrong");
    }
})