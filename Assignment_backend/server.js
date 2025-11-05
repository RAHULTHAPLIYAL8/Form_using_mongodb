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
app.use(cors({
  origin: "https://form-using-mongodb-lt43.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true // allow cookies
}));

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