const Express=require("express");
const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const cors=require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();
const app =Express();
const router=require("./routers/user_router")
const bookrouter=require("./routers/book_router")
/////request for differenet server//////////////////////////
app.use(cors({origin: "*", 
credentials: true}));
app.use('/uploads', Express.static('uploads'));
app.use(cookieParser());
//Middleware for JSON Parsing///////////////////////////
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////
mongoose.connect(`${process.env.MONGO_URL}`).then(()=>
{
    console.log("Mongodb Database connecte!!!")
}).catch((err)=>
{
    console.log(err);
})

app.use("/",router);
app.use("/book",bookrouter);

const port=process.env.PORT || 8000

app.listen(port,(err)=>
{
    console.log("Server is Running Fantastically")
})