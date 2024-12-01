const Express=require("express");
const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const cors=require("cors");
const bodyParser = require("body-parser");

const app =Express();
const router=require("./routers/user_router")
/////request for differenet server//////////////////////////
app.use(cors())
//Middleware for JSON Parsing///////////////////////////
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/Assign").then(()=>
{
    console.log("Mongodb Database connecte!!!")
}).catch((err)=>
{
    console.log(err);
})

app.use("/",router);


app.listen(8000,(err)=>
{
    console.log("Server is Running Fantastically")
})