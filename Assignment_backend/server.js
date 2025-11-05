const Express=require("express");
const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const cors=require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app =Express();
const router=require("./routers/user_router")
const bookrouter=require("./routers/book_router")
/////request for differenet server//////////////////////////
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use('/uploads', Express.static('uploads'));
app.use(cookieParser());
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
app.use("/book",bookrouter);

const port=process.env.PORT | 8000

app.listen(port,(err)=>
{
    console.log("Server is Running Fantastically")
})