const express=require("express");
const router=express.Router();
const request=require("../controllers/user/Request");
const authMiddleware=require("../middleware/authenticate");


router.post("/getrequest",authMiddleware,request.createRequest);
router.patch("/update/:id",authMiddleware,request.updateRequestStatus);
router.get("/get",authMiddleware,request.getRequestsForUser);


module.exports=router

