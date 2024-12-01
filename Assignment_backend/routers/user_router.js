const express=require("express");
const router=express.Router();
const signin=require("../controllers/user/signin_controller");
const signup=require("../controllers/user/signup_controller");

router.post("/signin",signin);
router.post("/signup",signup);

module.exports=router;

